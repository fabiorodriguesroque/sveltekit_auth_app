<script lang="ts">
    import type { PageData } from './$types';

    export let data; 
    const authUser = data.authUser;
</script>

<div>
    Private Dashboard - logged in email: { authUser.email }
</div>