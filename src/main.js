Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img v-bind:src="image"/>
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <h1>{{ description }}</h1>
        <h3>details</h3>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <h3>variants</h3>
        <div v-for="(variant, index) in variants"
              :key="variant.variantId"
              class="color-box"
              :style="{ backgroundColor: variant.variantColor }"
              @mouseover="updateProduct(index)">
        </div>
        <div>
          <button v-on:click="addToCart"
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }">Add to Cart</button>
          <button v-on:click="removeFromCart"
                  :disabled="!inStock || cart <= 0"
                  :class="{ disabledButton: !inStock }">remove</button>
        </div>

        <p v-if="inStock > 10">In Stock</p>
        <p v-else-if="inStock <= 10 && inStock > 0">Almost Out of Stock</p>
        <p v-else>Out of Stock</p>

        <p>Shipping: {{ shipping }}</p>
      </div>
    </div>
  `,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'socks',
      description: 'Lorem ipsum dolor sit amet',
      selectedVariant: 0,
      details: ["80% cotton", "20% polyester", "other"],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: './assets/vmSocks-green.jpg',
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: './assets/vmSocks-blue.jpg',
          variantQuantity: 0
        }
      ]
    }
  },
  methods: {
    addToCart: function () {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart: function () {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
      this.selectedVariant = index
      console.log(index)
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      return 2.99
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCartUp(id) {
      this.cart.push(id)
    },
    updateCartDown(id) {
      this.cart.push(id)
    }
  }
})
