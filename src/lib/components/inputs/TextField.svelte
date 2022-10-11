<script lang="ts">
    // Required props 
    export let id: string;

    // Optional props
    export let type: string = 'text';
    export let label: boolean | null = false;
    export let labelText: string | null = '';
    export let placeholder: string = '';
    export let required: boolean = false;
    export let value: string = '';

    const onInput = (e: any) => {
        value = e.target.value;
    }
    // function typeAction(node: any) {
    //     node.type = type
    // }

</script>
<div>
    {#if label && labelText}
        <label for={id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelText}</label>
    {/if}

    <input
        type={type}
        name={id} 
        id={id}
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 fr-remove-flowbite-border" 
        placeholder={placeholder}
        required={required}
        on:input={onInput}
    >
</div>


<style>
    .fr-remove-flowbite-border:focus {
        border-color: #475569;
        box-shadow: 0 0 0 0.5px #475569;   
    }
</style>