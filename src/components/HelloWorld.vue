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
  <p>Getting information from Atlas Mongo DB with GraphQL</p>
  <ul v-if="result && result.locals">
    <li v-for="local of result.locals" :key="local.id">
      {{ local.localName }} {{ local.picture }}
    </li>
  </ul>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'


export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const { result } = useQuery(gql`
      query getLocals {
        locals {
          _id
          localName
          phones {
            areaCode
            number
          }
          emails {
            address
          }
          picture
        }
      }
    `)
    return {
      result
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
