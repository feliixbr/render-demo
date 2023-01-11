const { createApp } = Vue;

const myApp = {
  data() {
    return {
      immos: [],
      immoC1: {},
      immoC2: {},
      token: false,
      val: 0,
    };
  },
  methods: {
    async getImmos() {
      try {
        const { data } = await axios.get('/immos');
        this.immos = data;
        this.token = false;
      } catch (error) {
        console.error(error);
      }
    },
    async delImmo({ id }) {
      await axios.delete(`/immos/${id}`);
      this.getImmos();
    },
    async getPrice(id) {
      this.immoC1 = { ...id };
      this.immoC2 = id;
      this.token = true;
    },
    async patchPrice() {
      const id = this.immoC2.id;
      await axios.patch(`/immos/${id}`, { price: this.val });
      this.getImmos();
      this.token = false;
    },
  },
};

createApp(myApp).mount('#app');
