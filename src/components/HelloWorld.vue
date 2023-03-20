<template>
  <div class="hello">
    <h1>Hello from VUE</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <p>
      The information below is being fetched from your Serverless Cloud API:
    </p>
    <h3>Edit this Vue.js app:</h3>
    <p>
      Open your terminal to the project directory and run <code>npm i</code> to
      install the Vue.js dependencies. Then run <code>cloud dev</code> to launch
      the local Vue.js dev server. You can access the API on your personal
      developer sandbox by appending <code>/api</code> to the local dev server's
      localhost address.
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import * as Realm from "realm-web";

const app = Realm.App.getApp('pupas-backdev-gugas'); // replace this with your App ID


async function loginApiKey(apiKey) {
  // Create an API Key credential
  const credentials = Realm.Credentials.apiKey(apiKey);
  // Authenticate the user
  const user = await app.logIn(credentials);
  // `App.currentUser` updates to match the logged in user
  console.assert(user.id === app.currentUser.id);
  return user;
}
await loginApiKey('');

const mongo = app.currentUser.mongoClient('mongodb-atlas');
const locals = await mongo.db('bwbdev').collection('locals').find();

console.log('Show locals collection');
console.log(locals[0].emails);

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const loading = ref(true);
    const users = ref([]);

    return {
      loading,
      users,
    };
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #fe5750;
}

#users {
  margin: 0 auto;
}

.active {
  color: #42b983;
}
.inactive {
  color: #fe5750;
}

p {
  max-width: 600px;
  margin: 1em auto;
}

code {
  background: #f1f1f1;
  padding: 0.2em;
  color: #fe5750;
}
</style>
