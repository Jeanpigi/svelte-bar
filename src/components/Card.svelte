<script>
    import { user } from "../lib/store";

    export let product;
    export let deleteProduct;
    export let editProduct;

    const formatter = new Intl.NumberFormat("en-CO", {
        style: "currency",
        currency: "COP",
    });
</script>

<style>
    .form_container_row3 {
        display: grid;
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
</style>

<div class="form_container_row3">
    <div class="form_card">
        <div class="form_card_info">
            <h5>{product.name}</h5>
            <p>{product.desc}</p>
            <p>{formatter.format(product.price)}</p>
            {#if $user.email === 'test@gmail.com'}
                <div>
                    <button
                        on:click={deleteProduct(product.id)}
                        disabled={$user.email !== 'test@gmail.com'}>
                        🗑
                    </button>
                    <button on:click={editProduct(product)}>🖊</button>
                </div>
            {/if}
        </div>
    </div>
</div>
