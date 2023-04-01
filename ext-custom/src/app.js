Ext.onReady(function(){
    const notificationWrapper = document.querySelector('.notification-wrapper');
    let isShowPanel = true;

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
        text: 'Скрыть панель',
        height:30,
        margin: '50 0 0 50',
        renderTo: Ext.getBody(),
        handler: function() {
            if (isShowPanel) {
                notificationWrapper.removeChild(document.querySelector('main-custom-element'));
                isShowPanel = false;
                return;
            }
            addPanel();
            isShowPanel = true;
        }
    });

    Ext.create('Ext.Button', {
        text: 'Передать данные',
        height:30,
        margin: '50 0 0 50',
        renderTo: Ext.getBody(),
        handler: function() {
            if (isShowPanel) {
                notificationWrapper.removeChild(document.querySelector('main-custom-element'));
                isShowPanel = false;
                return;
            }
            addPanel();
            isShowPanel = true;
        }
    });

    function addPanel() {
        notificationWrapper.append(document.createElement('main-custom-element'));
    }
    addPanel();
});

