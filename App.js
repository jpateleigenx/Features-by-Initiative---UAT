Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
	launch: function() {
		
		// Radian
		// var project_oid = '/project/37192747640';

		this.add({
			xtype: 'rallycombobox',
			stateful: true,
			stateId: this.getContext().getScopedStateId('initiative'),
			width: 600,
			fieldLabel: 'Select Initiative:',
			// Display Template
			displayTpl: Ext.create('Ext.XTemplate','<tpl for=".">','{FormattedID} - {Name}','</tpl>'),
			// List Template
			tpl: Ext.create('Ext.XTemplate','<tpl for=".">','<div class="x-boundlist-item">{FormattedID} - {Name}</div>','</tpl>'),
			storeConfig: {
				autoLoad: true,
				model: 'PortfolioItem/Initiative',
				fetch: ['FormattedID', 'Name'],
				sorters: [
					{
						property: 'ObjectID',
						direction: 'ASC'
					}
				],
				remoteGroup: false,
				remoteSort: false,
				remoteFilter: false,
				limit: Infinity,
				// context: {
					// project: project_oid,
					// projectScopeDown: true,
					// projectScopeUp: false
				// }
			},
			listeners: {
				// select: this._onSelect,
				select: this._onLoad,
				ready: this._onLoad,
				scope: this
			}
		});
	},
		
	_onLoad: function() {
		var project_oid = '/project/37192747640';
		
		if (this.down('#features')) {
			this.down('#features').destroy();
		}
		
		var store = "";
		
		this.add({
			id: 'features',
			xtype: 'rallygridboard',
			modelNames: ['PortfolioItem/Feature'],
			context: this.getContext(),
			storeConfig: {
				context: {
					project: project_oid,
					projectScopeDown: true,
					projectScopeUp: false
				},
				filters: [this._getFilter()]
			},
			columnConfig: {
				plugins: [
					{ptype: 'rallycolumncardcounter'}
				]
			},
            // cardBoardConfig: {
                // attribute: 'State',
				// fetch: ['Project', 'PercentDoneByStoryCount'],
				// showIconsAndHighlightBorder: false,
				// editable: false,
				// showAge: true
            // },
			cardBoardConfig: this._getBoardConfig(),
			gridConfig: {
				store: store,
				columnCfgs: [
					'Name',
					'ScheduleState',
					'Owner',
					'PlanEstimate'
				]
			},
			// cardConfig: {
				// xtype: 'rallycard',
				// fields: ['State','Project']
            // },
			plugins: [
				{
					ptype: 'rallygridboardfieldpicker',
					modelNames: ['PortfolioItem/Feature'],
					headerPosition: 'left',
					boardFieldDefaults: ['Project','PercentDoneByStoryCount']
					// boardAlwaysSelectedValues: ['Project','PercentDoneByStoryCount']
					// stateful: true,
					// stateId: context.getScopedStateId('columns-example')
				// }, {
                    // ptype: 'rallygridboardcustomfiltercontrol',
					// headerPosition: 'left',
                    // filterControlConfig: {
						// modelNames: ['PortfolioItem/Feature'],
						// stateful: true,
						// stateId: context.getScopedStateId('custom-filter-example')
					// },
                    // },
					// showOwnerFilter: false
					// ownerFilterControlConfig: {
						// stateful: true,
						// stateId: context.getScopedStateId('owner-filter-example')
					// }
                }
			],
			listeners: {
				load: this._onLoadBoard,
				scope: this
			}
		});
	},
	
	// _onSelect: function() {

	// },
		
	_getFilter: function() {
		var combo = this.down('rallycombobox');
		return {
			property: 'Parent.Parent',
			operator: '=',
			value: combo.getValue()
		},
		{
			property: 'c_UATTeamMember',
			operator: '!=',
			value: null
		};
	},

	_getBoardConfig: function () {
		return {
			xtype: 'rallycardboard',
			attribute: 'c_UATState',
			rowConfig: {
				field: 'c_UATTeamMember',
				// sorters: [
					// {
						// property: this._getRankField(),
						// direction: 'ASC'
					// },
					// {
						// property: 'TaskIndex',
						// direction: 'ASC'
					// }
				// ],
				// headerConfig: {
					// xtype: 'rallytaskboardrowheader'
				// },
				// sortField: this._getRankField(),
				// enableCrossRowDragging: false
			},
			// margin: '10px 0 0 0',
			// plugins: [{ptype:'rallyfixedheadercardboard'}]
		};
	},
	
	_onLoadBoard: function() {
		var board = this.down('rallycardboard');
		rows = board.getRows();
		var rowsfilled = rows[0].columns[0]._cardsByRow;
		console.log(rowsfilled);
		// console.log(rows);
		Ext.Array.each(rows, function(row) {
			// row.collapse();
			console.log(row.value);
		});
	},

});