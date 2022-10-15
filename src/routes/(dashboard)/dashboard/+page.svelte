<script>
    export let data
    const authUser = data.authUser;
</script>

<div class="flex items-center">
    Private Dashboard - logged in email: { authUser.email }

    <div class="ml-4">
        <form action="?/logout" method="POST">
            <button type="submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Logout
            </button>
        </form>
    </div>
</div>