<script lang="ts">
    import { authUser } from '$lib/store/users'; 

</script>

<div>
    Private Dashboard { authUser.name }
</div>