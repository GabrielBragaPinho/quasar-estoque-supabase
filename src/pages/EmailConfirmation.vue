<template>
  <q-page padding>
    <p class="text-body1">
      Thanks for Registering!
    </p>
    <p class="text-body1">
      Please verify your e-mail to finish registration: <strong>{{ $route.query.email }}</strong>
    </p>
    <div class="row">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-btn
          label="Back to Login"
          color="primary"
          class="full-width"
          outline
          :to="{ name:'login' }"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'PageEmailConfirmation'
})
</script>
