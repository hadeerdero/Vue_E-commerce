<template>
    <div class="container">
      <div class="mt-4">
      <form @submit.prevent="handleSubmit">
        <div class="form-group" v-if="form.fieldType === 'text'">
          <label for="labelName">Label Name</label>
          <input type="text" class="form-control" id="labelName" v-model="form.labelName" required />
        </div>
        <div class="form-group" v-if="form.fieldType === 'text'">
          <label for="cell_size" >Cell Size</label>
          <input type="text" class="form-control" id="cellSize" v-model="form.cell_size" required />
        </div>
        <div class="form-group">
          <label for="fieldType">Field Type</label>
          <select class="form-control" id="fieldType" v-model="form.fieldType" @change="handleFieldTypeChange" required>
            <option value="" disabled>Select Field Type</option>
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="table">Table</option>
          </select>
        </div>
        
        <div v-if="form.fieldType === 'text'" class="form-group">
          <label for="editor">value</label>
          <input type="text" class="form-control" id="value" v-model="form.textValue"  />
        </div>

        <div v-if="form.fieldType === 'textarea'" class="form-group">
          <label for="editor">Editor</label>
          <!-- <textarea id="editor" class="form-control" v-model="form.editorContent"></textarea> -->
          <ckeditor :editor="editor" v-model="form.editorContent" :config="editorConfig"></ckeditor>
        </div>
        
        <div v-if="form.fieldType === 'table'" class="form-group">
          <label for="rows">Number of Rows</label>
          <input type="number" class="form-control" id="rows" v-model="form.tableRows"  />
          <label for="columns">Number of Columns</label>
          <input type="number" class="form-control" id="columns" v-model="form.tableColumns"  />
          <div>
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
                       
                      <input type="text" class="form-control" v-model="tableState[rowIndex][colIndex]"  />
                    </span>
                     <input v-else type="text" v-model="tableState[rowIndex][colIndex]" @blur="finishEditing(rowIndex, colIndex)"> 
                  </td>
                </tr>
              </tbody>
              
            </table>
          </div>
          </div>
        <button  class="btn btn-primary mt-3 m-2" @click="addToFields">Preview</button>
        <button type="submit" class="btn btn-primary mt-3 m-2">Finish</button>
      </form>
      </div>
      <div>
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
            <!-- <label v-if="key == 'tableToPrint' && value">
              <input type="checkbox" v-model="field.tableVisiability" >
              {{key}} 
            </label> -->
          </div>
        </div>
       
      </div>
  
      <div id="print-section">
        <h2>Form</h2>
        <div v-for="(field, index) in fields" :key="index">

          <span :class="{ 'visibility-hidden': !field.labelVisability }">{{ field.labelName }} : </span> <span :class="{ 'visibility-hidden': !field.valueVisability }">{{ field.textValue }}</span>
          <div :class="{ 'visibility-hidden': !field.editorContentVisability }"> {{convertToPlainText(field.editorContent)}} </div>

        </div>

        <!-- <table class="table table-borderless">
            <tbody>
              <tr v-for="(field, index) in fields" :key="index">
                <td  :style="{'width': '5px', 'white-space': 'nowrap'}"  :class="{ 'visibility-hidden': !field.labelVisability }">{{field.labelName}}:</td>
                <td   :class="{ 'visibility-hidden': !field.valueVisability }">{{field.textValue}}</td>
                <td  :class="{ 'visibility-hidden': !field.editorContentVisability }">{{convertToPlainText(field.editorContent)}}</td>
                <td :class="{ 'visibility-hidden': !field.tableVisiability }">{{field.tableToPrint}}</td> 
                
              </tr>
            
            </tbody>
          </table> -->
          <div>
            <table class="table ">
              <tbody>
                <tr v-for="(row, rowIndex) in tableToPrint" :key="rowIndex">
                  <td v-for="(col, colIndex) in row" :key="colIndex">
                    <span v-if="!editing[rowIndex + '-' + colIndex]">
                     {{ col }} 
                      
                    </span>
                    <input v-else type="text" v-model="tableToPrint[rowIndex][colIndex]">
                  </td>
                </tr>
              
              </tbody>
            </table>
          </div>

        
       </div> 
  
      <button @click="printForm">Print</button> 
    </div>
  </template>
  
  <script>
  import _ from 'lodash';
  import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
  export default {
    components: {
        ckeditor: CKEditor.component
    },
    data() {
      return {
        plainText:'',
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
        cell_size:"",
        labelName: '',
        textValue:'',
        fieldType: '',
        editorContent: '',
        tableRows: 0,
        tableColumns: 0,
        tableToPrint:[],
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
        this.tableState = _.cloneDeep(newVal);;
      },
      immediate: true // Initialize immediately when component is created
    }
  },
    created() {
    this.tableState = _.cloneDeep(this.tableData)
  },
  methods: {
    convertToPlainText(editorContent) {
      let div = document.createElement('div');
      div.innerHTML = editorContent;
      this.plainText = div.textContent || div.innerText || '';
      return this.plainText
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
      this.form = {
        labelVisability:false,
        valueVisability:false,
        cell_size:"",
        labelName: '',
        textValue:'',
        fieldType: '',
        editorContent: '',
        tableRows : 0,
        tableColumns : 0,
      
      }
      
        if(this.tableState.length > 0){

          this.tableToPrint = _.cloneDeep(this.tableState) ;
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
  
  <style>
  .custom-td td:first-child {
    white-space: nowrap; /* Prevent wrapping */
    width: auto; /* Force the cell to fit the content */
}
  .visibility-hidden {
    visibility: hidden;
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
    #print-section {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  </style>
  