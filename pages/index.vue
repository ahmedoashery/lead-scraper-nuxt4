<script setup>
const configForm = ref({
  niche: 'Real Estate Agencies',
  city: 'Dubai',
  limit: 20,
  n8nWebhook: 'https://yourdomain.com'
})

const loadingState = ref(false)
const statusMessage = ref('')
const statusColor = ref('emerald')

const triggerAutomation = async () => {
  if (!configForm.value.n8nWebhook) {
    statusMessage.value = 'Please provide a valid n8n Webhook URL.'
    statusColor.value = 'orange'
    return
  }

  loadingState.value = true
  statusMessage.value = 'Transmitting configuration parameters...'

  try {
    await $fetch(configForm.value.n8nWebhook, {
      method: 'POST',
      body: {
        niche: configForm.value.niche,
        city: configForm.value.city,
        limit: Number(configForm.value.limit)
      }
    })

    statusColor.value = 'emerald'
    statusMessage.value = 'Success! n8n background execution pipeline triggered.'
  } catch (error) {
    statusColor.value = 'red'
    statusMessage.value = 'Connection failed. Please check your n8n URL or server logs.'
  } finally {
    loadingState.value = false
  }
}
</script>

<template>
  <UContainer class="py-12 max-w-xl">
    <UCard>
      <template #header>
        <div class="flex items-center space-x-3">
          <UIcon name="i-heroicons-cpu-chip-solid" class="w-6 h-6 text-primary-500" />
          <div>
            <h1 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dynamic Lead Scraper Control
            </h1>
            <p class="text-xs text-gray-400 mt-0.5">Change parameters at any time to feed your Google Sheets pipeline.</p>
          </div>
        </div>
      </template>

      <form @submit.prevent="triggerAutomation" class="space-y-5">
        <UFormGroup label="Target Niche / Business Type" name="niche" required>
          <UInput
            v-model="configForm.niche"
            placeholder="e.g. Luxury Car Rental, Moving Services, Roofers"
            icon="i-heroicons-briefcase"
          />
        </UFormGroup>

        <UFormGroup label="Target Geographical Market (City)" name="city" required>
          <UInput
            v-model="configForm.city"
            placeholder="e.g. Dubai, Riyadh, Cairo, Jeddah"
            icon="i-heroicons-map-pin"
          />
        </UFormGroup>

        <UFormGroup label="Scrape Lead Batch Limit Threshold" name="limit">
          <UInput
            v-model="configForm.limit"
            type="number"
            min="1"
            max="100"
            icon="i-heroicons-numbered-list"
          />
        </UFormGroup>

        <UFormGroup label="n8n Production Webhook Endpoint Address" name="webhook" required>
          <UInput
            v-model="configForm.n8nWebhook"
            type="url"
            placeholder="https://yourdomain.com..."
            icon="i-heroicons-link"
          />
        </UFormGroup>

        <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-3">
          <UButton
            type="submit"
            color="black"
            block
            icon="i-heroicons-play-solid"
            :loading="loadingState"
          >
            Deploy Parameters & Fire Run
          </UButton>

          <Transition name="fade">
            <p
              v-if="statusMessage"
              class="text-xs font-semibold text-center py-2 px-3 rounded-lg"
              :class="{
                'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500': statusColor === 'emerald',
                'bg-orange-50 dark:bg-orange-950/20 text-orange-500': statusColor === 'orange',
                'bg-red-50 dark:bg-red-950/20 text-red-500': statusColor === 'red'
              }"
            >
              {{ statusMessage }}
            </p>
          </Transition>
        </div>
      </form>
    </UCard>
  </UContainer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
