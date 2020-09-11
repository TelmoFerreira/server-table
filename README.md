<h6>Step 1: Install ng-select:</h6>
npm install https://github.com/TelmoFerreira/server-table.git

<h6>Step 2: Import the ServerTableModule:</h6>
import { ServerTableModule } 				from 'server-table';

@NgModule({
  declarations: [AppComponent],
  imports: [ServerTableModule],
  bootstrap: [AppComponent]
})
export class AppModule {}

<h6>Step 3: Add component</h6>
	<serverTable [settings]="tableSettings"></serverTable>  
<h6>Step 4: configs</h6>	

	public tableSettings = {
		service:'https:.......',    
		moveElementToMiddle:'someid', // will be attached to the table <div id="someid"></div>
		pagination:{'align':'end'},  
		params:( data )=>{
			return {'param1':'11111111'};
		},
		actions:[{
			'html':'<i class="far fa-eye text-primary"></i>',
			'callback': (data) => {
				console.log( data );
			}
		},{
			'html':'<i class="far fa-trash-alt text-danger"></i>',
			'delay':{'time':3000,'color':'danger','msg':'Deleting...'},
			'callback': (data) => {
				if(data['type'] == 'timeout'){
						
					//Your rest delete code....
						
					data['data'].hide();//hide row
					data['data'].show();//show row
					data['button']['disabled'] = true; 
							
				}
			}
		}],
		beforeRender: ( rowData ) => {
		
			rowData['actions'][0]['disabled'] = true; //Disable 1button  
		
			return rowData;
		},
		columns: [
			{
				title: 'First Name',
				key: 'f_name',
				order: 'asc',
				width:'30%'
			},
			{
				title: 'Last Name',
				key: 'l_name',
				width:'30%'
			},
			{
				title: 'Email',
				key: 'email',
				width:'30%'
			},
		],
	};

<h6>Update data</h6>
	
	
	this.tableSettings.params({
		'param1':'11111111',
		'param2':'22222222',
		'param3':'33333333',
	});
