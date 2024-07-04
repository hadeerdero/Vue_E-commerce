<template>
    <div class="container">
      <div class="row">
        <div class="col-8 mt-4">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="fieldType">Field Type</label>
              <select class="form-control" id="fieldType" v-model="form.fieldType" @change="handleFieldTypeChange" required>
                <option value="" disabled>Select Field Type</option>
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
                <option value="table">Table</option>
              </select>
            </div>
            <div class="form-group" v-if="form.fieldType === 'text'">
              <label for="labelName">Label Name</label>
              <input type="text" class="form-control" id="labelName" v-model="form.labelName" required />
            </div>
            <!-- <div class="form-group" v-if="form.fieldType === 'text'">
              <label for="cell_size" >Cell Size</label>
              <input type="text" class="form-control" id="cellSize" v-model="form.cell_size" required />
            </div> -->
            
            
            <div v-if="form.fieldType === 'text'" class="form-group">
              <label for="editor">value</label>
              <input type="text" class="form-control" id="value" v-model="form.textValue"  />
            </div>
    
            <div v-if="form.fieldType === 'textarea'" class="form-group">
              <label for="editor">Editor</label>
              <!-- <textarea id="editor" class="form-control" v-model="form.editorContent"></textarea> -->
              <!-- <ckeditor :editor="editor" v-model="form.editorContent" :config="editorConfig"></ckeditor> -->
              <ckeditor :editor="editor" v-model="form.editorContent" :config="editorConfig"></ckeditor>
            </div>
            
            <div v-if="form.fieldType === 'table'" class="form-group">
              <label for="rows">Number of Rows</label>
              <input type="number" class="form-control" id="rows" v-model="form.tableRows"  />
              <label for="columns">Number of Columns</label>
              <input type="number" class="form-control" id="columns" v-model="form.tableColumns"  />
              <div class="mt-4">
                <table class="table">
                  <!-- <thead>
                    <tr>
                      <th v-for="col in form.tableColumns" :key="col">Column {{ col }}</th>
                    </tr>
                  </thead> -->
                  <tbody>
                    <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                      <td v-for="(col, colIndex) in row" :key="colIndex" @dblclick="editCell(rowIndex, colIndex)">
                        <span v-if="!editing[rowIndex + '-' + colIndex]">
                           
                          <input type="text" class="form-control" v-model="form.tableState[rowIndex][colIndex]"  />
                        </span>
                         <input v-else type="text" v-model="form.tableState[rowIndex][colIndex]" @blur="finishEditing(rowIndex, colIndex)"> 
                      </td>
                    </tr>
                  </tbody>
                  
                </table>
              </div>
              </div>
            <button  class="btn btn-primary mt-3 m-2" @click="addToFields">Preview</button>
            <button type="submit" class="btn btn-primary mt-3 m-2" @click="createForm()">Finish</button>
          </form>
          </div>
          <div class="col-4 mt-4">
            <h2>Select Fields to Print</h2>
            <!-- <div v-for="(field, index) in fields" :key="index">
              <input type="checkbox" v-model="field.visible" />
              {{ field.labelName }}
            </div> -->
            <div v-for="(field, index) in fields" :key="index">
              <div v-for="(value, key) in field" :key="key">
                <label v-if="(key == 'labelName') && value" >
                  <input type="checkbox" v-model="field.labelVisability">
                 {{key}} : {{ value }}
                </label>
                <label v-if="(key == 'textValue') && value">
                  <input type="checkbox" v-model="field.valueVisability" >
                  {{key}} : {{ value }}
                </label>
                <label v-if="key == 'editorContent' && value">
                  <input type="checkbox" v-model="field.editorContentVisability" >
                  {{key}} : {{ value }}
                </label>
                <label v-if="key == 'tableState' && value.length > 0">
                  <input type="checkbox"  v-model="field.tableVisiability" >
                  {{key}} 
                </label>
              </div>
            </div>
           
          </div>
      </div>
     
      
  
      <div id="print-section">
        <h2>Form</h2>
        <div v-for="(field, index) in fields" :key="index">

          <span :class="{ 'visibility-hidden': !field.labelVisability }" v-if="field.labelName">{{ field.labelName }} : </span> <span :class="{ 'visibility-hidden': !field.valueVisability }" v-if="field.textValue ">{{ field.textValue }}</span>
          <span :class="{ 'visibility-hidden': !field.editorContentVisability }" v-if="field.editorContent"> {{convertToPlainText(field.editorContent)}} </span>
          <span :class="{ 'visibility-hidden': !field.tableVisiability }">
            <table class="table table-bordered" :class="{'visibility-hidden': !field.tableVisiability }">
              <tbody :class="{'visibility-hidden': !field.tableVisiability }">
                <tr v-for="(row, rowIndex) in field.tableState" :key="rowIndex" :class="{'visibility-hidden': !field.tableVisiability }">
                  <td v-for="(col, colIndex) in row" :key="colIndex" :class="{'visibility-hidden': !field.tableVisiability }">
                    <span v-if="!editing[rowIndex + '-' + colIndex]" :class="{'visibility-hidden': !field.tableVisiability }">
                     {{ col }} 
                      
                    </span>
                    <input v-else type="text" v-model="field.tableState[rowIndex][colIndex]" :class="{'visibility-hidden': !field.tableVisiability }">
                  </td>
                </tr>
              
              </tbody>
            </table>
          </span>

        </div>
         
        
       </div> 
  
      <button @click="printForm">Print</button> 
    </div>
  </template>
  
  <script>
  import _ from 'lodash';
  // import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
// import { SlashCommand } from 'ckeditor5-premium-features';
import { ClassicEditor, Bold, Essentials, Italic, Paragraph, Undo } from 'ckeditor5';
import CKEditor from '@ckeditor/ckeditor5-vue';
import axiosInstance from '@/axios';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import axios from 'axios';

  export default {
    components: {
      ckeditor: CKEditor.component
    },
    data() {
      return {
        // plainText:'',
        editor: ClassicEditor,
            editorData: '<p>Hello from CKEditor 5 in Vue!</p>',
            editorConfig: {
              plugins: [ Bold, Essentials, Italic, Paragraph, Undo ],
              toolbar: [ 'undo', 'redo', '|', 'bold', 'italic' ]
            },
        form: {
        labelVisability:false,
        valueVisability:false,
        editorContentVisability : false,
        labelName: '',
        textValue:'',
        fieldType: '',
        editorContent: '',
        tableRows: 0,
        tableColumns: 0,
        tableState:[],
        tableVisiability:false,
      },
      checkedKeys: [],
      tableState:[],
      tableToPrint:[],
      // tableData: [],
      editing: [],
        fields: [
          // { label: 'Name', type: 'text', visible: true , value:"ahmed",cell_size:"2px"},
          // { label: 'Contract Date', type: 'date', visible: true, value:"01-07-2023", cell_size:"5px"},
          // { label: 'Phone', type: 'tel', visible: false, value:"01147116571", cell_size:"7px"},
          // // Add more fields as needed
        ],
      };
    },
    watch: {
    // Watch for changes in tableData and update tableState accordingly
    tableData: {
      handler(newVal) {
        this.form.tableState = _.cloneDeep(newVal);;
      },
      immediate: true // Initialize immediately when component is created
    }
  },
    created() {
    this.form.tableState = _.cloneDeep(this.tableData)
  },
  methods: {
    convertToPlainText(editorContent) {
      let div = document.createElement('div');
      let plainText = ''
      div.innerHTML = editorContent;
      plainText = div.textContent || div.innerText || '';
      return plainText
    },
    editCell(rowIndex, colIndex) {
      if (!this.editing[rowIndex]) {
        this.editing[rowIndex] = [];
      }
     this.editing[rowIndex][colIndex] = true;
    },
    finishEditing(rowIndex, colIndex) {
     this.editing[rowIndex][colIndex] = false;
    },
  
  
      // initializeCheckedKeys() {
      // this.fields.forEach((field, index) => {
      //   this.$set(this.checkedKeys, index, {});
      //   Object.keys(field).forEach(key => {
      //     this.$set(this.checkedKeys[index], key, false);
      //   });
      // });
    // },
      handleFieldTypeChange() {
      // Clear relevant fields when changing the field type
      if (this.form.fieldType !== 'textarea') {
        this.form.editorContent = '';
      }
      if (this.form.fieldType !== 'table') {
        this.form.tableRows = 0;
        this.form.tableColumns = 0;
      }
    },
    handleSubmit() {
      // Handle form submission
      console.log(this.form);
    },
    addToFields(){
      this.fields.push(this.form)
      // if(this.form.tableState.length > 0){

      //   this.tableToPrint = _.cloneDeep(this.form.tableState) ;
      // }
      this.form = {
        labelVisability:false,
        valueVisability:false,
        labelName: '',
        textValue:'',
        fieldType: '',
        editorContent: '',
        tableRows : 0,
        tableColumns : 0,
       tableState:[],
      
      }
      
      
    },
    async createForm(){
      // await axiosInstance.post('print-form/printforms',this.fields).then(res => {
      //          console.log(res.data)
                
      //       }).catch(error => {
      //           console.log(error)
      //       })
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
      try {
        const response = await axios.post('api/v1/printforms', this.fields,{
          headers: {
            Authorization: `Token ${token}`
          }
        });
        this.someData = response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Authentication error: Token is invalid or expired');
        } else {
          console.error('Error fetching data:', error);
        }
      }
    },
      printForm() {
        window.print();
      },
    },
    computed: {
      pixels(){
        return this.form.labelName.length * 10
      },
      tableData() {
      let data = [];
      for (let i = 0; i < this.form.tableRows; i++) {
        let row = [];
        for (let j = 0; j < this.form.tableColumns; j++) {
          row.push("");
        }
        data.push(row);
      }
      return data;
    }
    // getDivStyle() {
    //   return {
    //     color: this.color,
    //     fontSize: this.fontSize
    //   };
    // }
  }
  };
  </script>
  
  <!-- .custom-td td:first-child {
    white-space: nowrap; /* Prevent wrapping */
    width: auto; /* Force the cell to fit the content */
} -->
<!-- .custom-table-border{
  border-width: unset;
} -->
<!-- .custom-table-border tr{
  border-width: unset;
} -->
  <style>
  .visibility-hidden {
    visibility: hidden;
  }
  .width-class{
    width: 100%;
  }
  @media print {
   
    .visibility-hidden {
      visibility: hidden !important;
    }
  
    body * {
      visibility: hidden;
    }
    #print-section, #print-section * {
      visibility: visible;
    }
    table{
      visibility: hidden ;
      }
    #print-section {
      position: absolute;
      left: 0;
      top: 0;
    }
    .hidden-print {
      visibility: hidden !important;
    }
    /* Conditional rule based on .visibility-hidden */
  }
</style>
<!-- .visibility-hidden #print-section,
.visibility-hidden #print-section span table {
  visibility: hidden;
} -->
  