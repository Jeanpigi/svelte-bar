<script>
    export let searchProduct;
</script>

<style>
    .search {
        color: #000000;
        width: max-content;
        border-radius: 10px;
    }

    .search > input {
        padding: 10px;
    }

    .search > input:focus {
        outline-width: 0;
    }
</style>

<div class="search">
    <input
        type="text"
        placeholder="Buscar productos"
        on:keyup={searchProduct} />
</div>
