<script>
    import { user } from "../lib/store";
    import Form from "../components/Form.svelte";
</script>

<style>
    .dashboard {
        padding: 10px;
        display: grid;
        justify-content: center;
    }
</style>

<div class="dashboard">
    <div class="dashboard_container">
        <h1>Bienvenido a tu DashBoard</h1>
        <p>Tu dirección de córreo électronico es {$user.email}</p>
        <Form />
    </div>
</div>
