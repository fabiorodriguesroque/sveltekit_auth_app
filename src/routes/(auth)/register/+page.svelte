<script lang="ts">
    import TextField from "$lib/components/inputs/TextField.svelte";
    import { slide, fade } from 'svelte/transition';
    import Error from "$lib/components/alerts/Error.svelte";
    import type { ActionData } from './$types';

    let email: string; 
    let password: string;
    let passwordConfirmation: string; 

    export let form: ActionData;

</script>

<div transition:slide>
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2">
        Create an account
    </h1>
    
    <!-- TODO - improve this repeated code -->
    {#if form?.passwordsNotMatch}
        <div transition:fade>
            <Error message="The passwords do not match, please try again." />
        </div>
    {/if}

    {#if form?.required}
        <div transition:fade>
            <Error message="All fields are required, please try again." />
        </div>
    {/if}

    {#if form?.unique}
        <div transition:fade>
            <Error message="This email already exists, please try again." />
        </div>
    {/if}

    <form class="space-y-4 md:space-y-6" action="?/register" method="POST">
        <TextField
            id="email" 
            type="email"
            placeholder="michaelowen@gmail.com"
            label={true}
            labelText="Your Email"
            required={true}
            bind:value={email}
        />
        <TextField 
            id="password" 
            type="password"
            placeholder="••••••••"
            label={true}
            labelText="Password"
            required={true}
            bind:value={password}
        />
        <TextField 
            id="password-confirmation" 
            type="password"
            placeholder="••••••••"
            label={true}
            labelText="Password Confirmation"
            required={true}
            bind:value={passwordConfirmation}
        />
        <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required>
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/terms-and-conditions">Terms and Conditions</a></label>
            </div>
        </div>
        <button class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Do you already have an account? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
        </p>
    </form>
</div>