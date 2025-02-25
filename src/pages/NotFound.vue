<script setup>
import Button from '@/components/ui/button/Button.vue';
import router from '@/router';
</script>

<template>
    <div class="flex items-center justify-center p-5">
        <div class="bg-white dark:bg-gray-900">
            <div class="w-[350px] px-4 py-8 mx-auto lg:py-16 lg:px-6">
                <div class="max-w-screen-sm mx-auto text-center">
                    <h1
                        class="mb-4 font-extrabold tracking-tight text-7xl lg:text-9xl text-primary-600 dark:text-primary-500">
                        404</h1>
                    <p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                        Something's
                        missing.</p>
                    <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page.
                        You'll find lots to explore on the home page. </p>
                    <Button class="w-full" @click="router.push('/')">Kembali ke Dashboard</Button>

                </div>
            </div>
        </div>
    </div>
</template>