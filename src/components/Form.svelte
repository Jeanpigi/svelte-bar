<script>
    import { db } from "../lib/firebase";
    import Search from "./Search.svelte";

    import toastr from "toastr";

    import { user } from "../lib/store";

    let product = {
        name: "",
        desc: "",
        price: 0,
    };

    let products = [];
    let searchProducts = products;

    let editStatus = false;
    let currentId;

    const formatter = new Intl.NumberFormat("en-CO", {
        style: "currency",
        currency: "COP",
    });

    db.collection("productos").onSnapshot((querySnapshot) => {
        let docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
        });

        products = [...docs];
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

    const handleSearch = (event) => {
        const value = event.target.value;
        searchProducts = products.filter((product) =>
            product.products.toLowerCase().includes(value.toLowerCase())
        );
    };
</script>

<style>
    .form_container {
        display: grid;
        grid-template-rows: auto auto auto;
        grid-row-gap: 10px;
        grid-auto-flow: row;
    }

    .form_card {
        display: grid;
        justify-content: center;
        margin: 10px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 6px 18px -9px rgba(0, 0, 0, 0.75);
        transition: transform 100ms ease-in;
        cursor: pointer;
    }

    .form_card:hover {
        transform: scale(1.07);
    }

    .form_card_info {
        margin-top: -9px;
        border-radius: 10px;
        padding: 20px;
        padding-top: 20px;
    }

    .form_card_info > h5 {
        font-size: 18px;
        font-weight: 600;
    }

    .form_card_info > p {
        font-size: 14px;
        font-weight: 300;
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

    .form_container_row3 {
        display: grid;
    }
</style>

<div class="form">
    <div class="form_container">
        <div class="form_container_row1">
            <form on:submit|preventDefault={handleSubmit}>
                <input
                    type="text"
                    bind:value={product.name}
                    placeholder="escribe un producto" />
                <textarea
                    name="description"
                    id="description"
                    bind:value={product.desc}
                    rows="7"
                    cols="50"
                    placeholder="describe la descriccion" />

                <input
                    type="number"
                    bind:value={product.price}
                    placeholder="escribe el precio" />
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

        <div class="form_container_row2">
            <Search {handleSearch} />
        </div>

        <div class="form_container_row3">
            {#each products as product}
                <div class="form_card">
                    <div class="form_card_info">
                        <h5>{product.name}</h5>
                        <p>{product.desc}</p>
                        <p>{formatter.format(product.price)}</p>
                        <div>
                            <button
                                on:click={deleteProduct(product.id)}
                                disabled={$user.email !== 'test@gmail.com'}>
                                🗑
                            </button>
                            <button on:click={editProduct(product)}>🖊</button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
