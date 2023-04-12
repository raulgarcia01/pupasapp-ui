<template>
  <p>Getting information from Atlas Mongo DB with GraphQL</p>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
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
    const { result, loading, error } = useQuery(gql`
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
      result,
      loading,
      error
    };
  }
};
</script>