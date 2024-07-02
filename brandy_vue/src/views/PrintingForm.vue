<template>
    <div>
      <div>
        <h2>Select Fields to Print</h2>
        <div v-for="(field, index) in fields" :key="index">
          <input type="checkbox" v-model="field.visible" />
          {{ field.label }}
        </div>
        
      </div>
  
      <div id="print-section">
        <h2>Form</h2>
        <table class="table table-borderless">
            <tbody>
              <tr v-for="(field, index) in fields" :key="index">
                <td :style="{ 'width': field.cell_size,}" v-if="field.visible">{{field.label}}</td>
                <td v-if="field.visible">{{field.value}}</td>
              </tr>
            
            </tbody>
          </table>
       </div> 
  
      <button @click="printForm">Print</button> 
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fields: [
          { label: 'Name', type: 'text', visible: true , value:"ahmed",cell_size:"2px"},
          { label: 'Contract Date', type: 'date', visible: true, value:"01-07-2023", cell_size:"5px"},
          { label: 'Phone', type: 'tel', visible: false, value:"01147116571", cell_size:"7px"},
          // Add more fields as needed
        ],
      };
    },
    methods: {
      printForm() {
        window.print();
      },
    },
    computed: {
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
  
  
  @media print {
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
  