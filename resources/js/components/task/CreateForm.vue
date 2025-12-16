<template>
    <div class="max-w-md mx-auto p-6 bg-white rounded-2xl shadow">
    <h1 class="text-xl font-semibold mb-4">Contact Form</h1>


    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
        <label class="block text-sm font-medium">Name</label>
        <input
        v-model="form.name"
        type="text"
        class="w-full mt-1 p-2 border rounded-lg"
        placeholder="Your name"
        />
        <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</p>
        </div>


        <div>
        <label class="block text-sm font-medium">Email</label>
        <input
        v-model="form.email"
        type="email"
        class="w-full mt-1 p-2 border rounded-lg"
        placeholder="you@example.com"
        />
        <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
        </div>


        <div>
        <label class="block text-sm font-medium">Message</label>
        <textarea
        v-model="form.message"
        rows="4"
        class="w-full mt-1 p-2 border rounded-lg"
        placeholder="Your message"
        ></textarea>
        </div>


        <button
        type="submit"
        class="w-full py-2 rounded-xl bg-black text-white"
        >
        Submit
        </button>
    </form>


    <pre class="mt-4 text-xs bg-gray-100 p-2 rounded">{{ form }}</pre>
    </div>
</template>


<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const form = reactive({
    name: '',
    email: '',
    message: '',
})


const errors = reactive({
    name: '',
    email: '',
    message: '',
})


async function handleSubmit() {
      try {
        errors.name = ''; // clear previous errors
        errors.email = '';
        errors.message = '';

        const response = await axios.post('/task', {
          name: form.name,
          email: form.email,
          message: form.message,
        });

        console.log('Success:', response.data);
        alert('Form submitted successfully!');
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // Laravel validation errors
          errors.name = error.response.data.errors.name || '';
          errors.email = error.response.data.errors.email || '';
          errors.message = error.response.data.errors.message || '';
        } else {
          console.error('Submission error:', error);
        }
      }
}

</script>


<style scoped>
body {
background: #f5f5f5;
}
</style>