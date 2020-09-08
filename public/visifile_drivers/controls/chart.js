function(args) {
/*
is_app(true)
component_type("VB")
display_name("Dropdown control")
description("This will return the dropdown control")
base_component_id("chart_control")
load_once_from_file(true)
visibility("PRIVATE")
read_only(true)
properties(
    [
        {
            id:     "text",
            name:   "Text",
            type:   "String"
        }
        ,
        {
            id:     "background_color",
            name:   "Background color",
            type:   "String"
        }
        ,
        {
            id:         "items",
            name:       "Items",
            type:       "Array",
            default:    [],
            editor:     "detail_editor"
        }
        ,

        {
            id:         "has_details_ui",
            name:       "Has details UI?",
            type:       "Boolean",
            default:    true,
            hidden:     true
        }
        ,
        {
            id:     "changed_event",
            name:   "Changed event",
            type:   "Event"
        }
        ,
        {
            id:     "default_selection",
            name:   "Default Selection",
            type:   "String",
            default: ""
        }
    ]
)//properties
logo_url("/driver_icons/chart.png")
*/

    Vue.component("chart_control",{
      props: ["meta","name","args","refresh","design_mode"]
      ,
      template:
`<div   v-bind:style='"width:100%;overflow-y:auto;height:100%"
        v-bind:refresh='refresh'>

    <div v-bind:style='"height:100%;width:100%; border: 0px;color:black;"'
         v-if='design_mode == "detail_editor"'>

         <div class="form-group">
             <label for="usr">Display:</label>
             <input v-model="new_text" type="text" class="form-control" id="usr">
         </div>
         <div class="form-group">
             <label for="usr">Value:</label>
             <input v-model="new_value" type="text" class="form-control" id="usr">
         </div>
         <div    class="btn btn-sm btn-info"
                 v-on:click="items.push({value: new_value, text:new_text});new_value='';new_text='';"
                 style="margin-bottom: 30px;"
         >
                 Add
         </div>


        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Display</th>
              <th scope="col">Value</th>
              <th scope="col"></th>
              <th scope="col">Delete</th>
            </tr>
          </thead>



          <tbody  v-bind:refresh='refresh'
                  v-for='(child_item,index)  in  items'>

             <tr v-if='child_item && isValidObject(child_item)'
                     v-bind:refresh='refresh'>

               <th scope="row">{{child_item.text}}</th>

               <td>{{child_item.value}}</td>

               <td>
                   <div    class='btn btn-info'
                           v-bind:refresh='refresh'
                           v-on:click='var x = items[index];items.splice(index, 1);items.splice(index - 1, 0, x);changedFn();'
                           v-if='child_item'
                           v-bind:style='"box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px;padding:0px; z-index: 21474836;opacity:1;"  +
                           "width: 60px; height: 20px; line-height:20px;text-align: center;vertical-align: middle;margin-left: 20px;"'>
                           UP

                   </div>
                   <div    class='btn btn-info'
                           v-bind:refresh='refresh'
                           v-on:click='var x = items[index];items.splice(index, 1);items.splice(index + 1, 0, x);changedFn();'
                           v-if='child_item'
                           v-bind:style='"box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px;padding:0px; z-index: 21474836;opacity:1;"  +
                           "width: 60px; height: 20px; line-height:20px;text-align: center;vertical-align: middle;margin-left: 20px;"'>
                           DOWN

                   </div>
               </td>

               <td>
                   <div    class='btn btn-danger'
                           v-bind:refresh='refresh'
                           v-if='child_item'
                           v-on:click='items.splice(index, 1);changedFn();'
                           v-bind:style='"box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px;padding:0px; z-index: 21474836;opacity:1;"  +
                           "width: 20px; height: 20px; line-height:20px;text-align: center;vertical-align: middle;margin-left: 20px;"'>
                           X
                   </div>
               </td>

             </tr>



       </tbody>
     </table>

     </div>

    <div v-bind:style='"height:100%;width:100%; border: 0px;" +
                       "background-color: "+    args["background_color"]  +  ";"'
         v-else>

         <canvas    id="myChart" width="400" height="400"
                    v-if='!design_mode'>
         </canvas>
    </div>




</div>`
      ,
      data: function() {
       return {
         value:             null,
         selected_index:    null,
         items:             [],
         new_value:         "",
         new_text:          ""
       }
     }
     ,
     watch: {
       // This would be called anytime the value of the input changes
       refresh: function(newValue, oldValue) {
           //console.log("refresh: " + this.args.text)
           if (isValidObject(this.args)) {
               this.value = this.args.value
               this.items = this.args.items
           }
       }
     }
     ,
     mounted: function() {
         registerComponent(this)

         if (isValidObject(this.args)) {
             this.items = this.args.items
             if (isValidObject(this.args.value)) {
                this.value = this.args.value
             }
         }
         var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
      }
      ,
      methods: {
            changedFn: function() {
                if (isValidObject(this.args)) {
                    this.args.value = this.value
                    this.args.items = this.items
                }
            }
            ,

            runEventHandler: function() {
                this.$emit('send', {
                                                type:               "subcomponent_event",
                                                control_name:        this.args.name,
                                                sub_type:           "changed",
                                                code:                this.args.changed_event
                                            })
            }
      }

    })
}
