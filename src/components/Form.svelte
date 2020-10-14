<script>
    import { onMount } from "svelte";
    import { db } from "../lib/firebase";
    import Search from "./Search.svelte";
    import Card from "./Card.svelte";
    import { fade } from "svelte/transition";
    import toastr from "toastr";

    import { user } from "../lib/store";

    let product = {
        name: "",
        desc: "",
        price: 0,
    };

    let products = [];
    let searchProduct = "";
    let result = [];

    let editStatus = false;
    let currentId;

    onMount(async () => {
        await db.collection("productos").onSnapshot((querySnapshot) => {
            let docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });

            products = [...docs];
        });
    });

    const addProduct = async () => {
        try {
            await db
                .collection("productos")
                .doc()
                .set({ ...product, createdAt: Date.now() });
            toastr.success("El producto fue guardado exitosamente", {
                timeOut: 1000,
                progressBar: true,
                positionClass: "toast-top-right",
            });
        } catch (error) {
            toastr.error(`No se pudo guardar el producto por ${error}`, {
                timeOut: 1000,
                progressBar: true,
                positionClass: "toast-top-right",
            });
        }
    };

    const updateProduct = async () => {
        try {
            await db.collection("productos").doc(currentId).update(product);
            toastr.success("El producto fue actualizado exitosamente", {
                timeOut: 1000,
                progressBar: true,
                positionClass: "toast-top-right",
            });
        } catch (error) {
            toastr.error(`No se pudo actualizar el producto por ${error}`, {
                timeOut: 1000,
                progressBar: true,
                positionClass: "toast-top-right",
            });
        }
    };

    const handleSubmit = () => {
        if (!editStatus) {
            addProduct();
        } else {
            updateProduct();
        }

        product = {
            name: "",
            desc: "",
            price: 0,
        };
    };

    const deleteProduct = async (id) => {
        try {
            await db.collection("productos").doc(id).delete();
        } catch (error) {
            console.log(error);
        }
    };

    const editProduct = (currentProduct) => {
        editStatus = true;
        product.name = currentProduct.name;
        product.desc = currentProduct.desc;
        product.price = currentProduct.price;
        currentId = currentProduct.id;
    };

    const onCancel = () => {
        editStatus = false;
        product = {
            name: "",
            desc: "",
            price: 0,
        };
    };
</script>

<style>
    .form_container {
        display: grid;
        grid-template-rows: auto auto auto;
        grid-row-gap: 10px;
        grid-auto-flow: row;
    }
    .form_container_row1 {
        background-color: #f7f7f7;
        color: #000000;
        height: fit-content;
        border-radius: 5px;
        border: 1px solid #f7f7f7;
        padding: 20px;
    }

    .form_container_row1 > form > input {
        height: 30px;
        margin: 10px 5px;
        background-color: white;
        width: 98%;
    }

    .form_button {
        background-color: #ed495a;
        color: white;
        border-radius: 2px;
        width: 100%;
        height: 30px;
        border: 1px solid;
        margin-top: 10px;
        border-color: #ce0a04 #ed495a rgb(250, 19, 19);
    }
    .form_container_row2 {
        justify-content: center;
        display: grid;
    }
</style>

<div class="form">
    <div class="form_container">
        {#if $user.email === 'test@gmail.com'}
            <div class="form_container_row1">
                <form on:submit|preventDefault={handleSubmit} transition:fade>
                    <input
                        type="text"
                        bind:value={product.name}
                        placeholder="Escribe un producto" />
                    <textarea
                        name="description"
                        id="description"
                        bind:value={product.desc}
                        rows="7"
                        cols="50"
                        placeholder="Escribe la descripción" />
                    <br />
                    <br />
                    <label for="precio">Precio:</label>
                    <input type="number" bind:value={product.price} />
                    <button
                        class="form_button"
                        disabled={$user.email !== 'test@gmail.com'}>
                        {#if !editStatus}Guardar{:else}Actualizar{/if}
                    </button>
                    {#if editStatus}
                        <button
                            class="form_button"
                            on:click={onCancel}>Cancel</button>
                    {/if}
                </form>
            </div>
        {:else}
            <div>
                <h1>Todos los productos</h1>
            </div>
        {/if}

        <div class="form_container_row2">
            <Search {searchProduct} />
        </div>

        {#each products as product}
            <Card {product} {deleteProduct} {editProduct} />
        {/each}
    </div>
</div>
