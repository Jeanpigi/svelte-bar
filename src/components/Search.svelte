<script>
    export let handleSearch;
</script>

<style>
    .search {
        background-color: #f7f7f7;
        color: #000000;
        border: 1px solid;
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
        on:keyup={(event) => handleSearch(event)} />
</div>
