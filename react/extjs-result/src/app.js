/*
function loadComponent (scope, module) {
    return async () => {
        // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
        await __webpack_init_sharing__('default');
        const container = window[scope]; // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        await container.init(__webpack_share_scopes__.default);
        const factory = await window[scope].get(module);
        const Module = factory();
        console.log('loadComponent', Module);
        return Module;
    };
}*/

import ('./react');

import {loadModule} from './utils';

Ext.onReady(function(){

    Ext.create('Ext.panel.Panel', {
        title:'Приложение ExtJS 4',
        width: 300,
        height: 150,
        padding:10,
        bodyPadding:5,
        items : [{
            xtype: 'textfield',
            fieldLabel: 'Имя',
            id: 'txtName',
            height: 20,
        },{
            xtype: 'textfield',
            fieldLabel: 'Фамилия',
            id: 'txtSurname',
            height: 20,
        },{
            xtype: 'textfield',
            fieldLabel: 'Компания',
            id: 'txtCompany',
            height: 20,
        }],
        renderTo: Ext.getBody()
    });

    Ext.create('Ext.Button', {
        text: 'Нажми',
        height:30,
        margin: '50 0 0 50',
        renderTo: Ext.getBody(),
        handler: function() {
            getModel();
        }
    });

    function getModel () {
        (async () => {
            const firstContainer = document.createElement("div");
            firstContainer.id = "divFirstContainer";
            document.getElementsByTagName('body')[0].appendChild(firstContainer);

            const module = await loadModule('app1', './App');

            window.Loader.load(module, firstContainer, null);
        })();
    }

});
