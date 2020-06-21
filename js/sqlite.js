/**
 * Created by Administrator on 2016/5/10.
 */
var note= {
    datatable:null,
    db:openDatabase('mydata','','My database',204800),
    init:function(){
        datatable=document.getElementById('datatable');
        this.showAllData();
    },
    removeAllData:function(){
        for(var i=datatable.childNodes.length-1;i>=0;i--){
            datatable.removeChild(datatable.childNodes[i]);
        }
        var tr=document.createElement('tr');
        var th1=document.createElement('th');
        var th2=document.createElement('th');
        var th3=document.createElement('th');
        th1.innerHTML='姓名';
        th2.innerHTML='留言';
        th3.innerHTML='时间';
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        datatable.appendChild(tr);
    },
    showData:function(row){
        var tr = document.createElement('tr');
        var td1=document.createElement('td');
        td1.innerHTML=row.name;
        var td2=document.createElement('td');
        td2.innerHTML=row.message;
        var td3=document.createElement('td');
        var t=new Date();
        t.setTime(row.time);
        td3.innerHTML= t.toLocaleDateString()+""+ t.toLocaleTimeString();
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        datatable.appendChild(tr);
    },
    showAllData:function(){
        this.db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS MsgData(name TEXT, message TEXT,time INTEGER) ',[]);
            tx.executeSql('SELECT *FROM MsgData',[],function(tx,rs){
                note.removeAllData();//用this.removeAllData()不行
                console.log(rs);
                for(var i=0;i<rs.rows.length;i++){
                    note.showData(rs.rows[i]);
                }
            });
        });
    },
    addData:function(name,message,time){
        this.db.transaction(function(tx){
            tx.executeSql('INSERT INTO MsgData VALUES(?,?,?)',[name,message,time],function(tx,ts) {
                alert("成功保存数据！");
            }, function (tx,error) {
                alert(error.sourse+':'+error.message);
            });
        });
    },
    saveData:function(){
        var name=document.getElementById('name').value;
        var memo=document.getElementById('memo').value;
        var time=new Date().getTime();
        this.addData(name,memo,time);
        this.showAllData();
    }
};