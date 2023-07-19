<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-if="result && result.users">
        <div class="col-12">
            <div class="card">
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" />
                            <Button label="Delete" icon="pi pi-trash" class="p-button-danger" />
                        </div>
                    </template>
                    <template v-slot:end>
                        <Button label="Export" icon="pi pi-upload" class="p-button-help"/>
                    </template>
                </Toolbar>
                <DataTable ref="dt" :value="result.users" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" :class="`p-datatable-sm`" removableSort stripedRows tableStyle="min-width: 50rem"
                           paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                           currentPageReportTemplate="{first} to {last} of {totalRecords}">
                    <template #header>
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <span class="text-xl text-900 font-bold">Customers</span>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText  placeholder="Keyword Search" />
                            </span>
                        </div>
                    </template>
                    <template #paginatorstart>
                        <Button type="button" icon="pi pi-refresh" text />
                    </template>
                    <template #paginatorend>
                        <Button type="button" icon="pi pi-download" text />
                    </template>
                    <Column field="givenName" header="Name" sortable></Column>
                    <Column field="familyName" header="Surname" sortable></Column>
                    <Column field="gender" header="Gender" sortable></Column>
                    <Column field="picture" header="Picture">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.picture">
                                <img :src="`${slotProps.data.picture}`" :alt="slotProps.data.picture" class="w-5rem"/>
                            </div>
                            <div v-else>
                                <img id="default-avatar" alt="default-avatar" src="layout/images/avatar/default.jpeg" class="w-5rem"/>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>
<script>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
export default {
    name: "ClientCatalog",
    props: {
        msg: String,
    },
    setup() {
        const { result, loading, error } = useQuery(gql`
          query getCustomers {
                users (query: { type: CUSTOMER  }) {
                _id
                givenName
                familyName
                gender
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