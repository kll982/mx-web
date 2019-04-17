{/* 三个都有类别显示 白莲花 */}
{this.state.typeProduct.replace(/0/g,"").length==3?
<div id="class1" className={styles.positionAb+" "+
this.computeClassLabel()}>{
        this.state.data1.map((item,index)=>{
            return <div className={styles.flexTableRow+" "+styles.tableBorder}>
                <div className={styles.table10+" "+styles.tableLarge1}>
                    <span>{item.value}</span>
                </div>
                {/* 期限显示 */}
                {this.state.QixianData.length>0?
                    <div className={styles.table20+" "+styles.tableMiddle1+" "+styles.flexTableColumn+" "+styles.tableMiddle1Margin}>
                        {this.state.QixianData.map((item1,index)=>{
                        if(item1.parId==item.id){
                            return (
        <div className={styles.flexTableRow+" "+styles.tableBorder}>
                <div className={styles.table20+" "+styles.tableLarge2}>
                    <span>{item1.value}</span>
                </div>
                {/* 金额显示 */}
                {this.state.AmountData.length>0?
                    <div className={styles.tableMiddle2+" "+styles.flexTableColumn}>
                        {this.state.AmountData.map((item2,index)=>{
                            // console.log(item2.parId==item1.id,item2.parId,item1.id)
                        if(item2.parId==item1.id){
                            return <div className={styles.aligncenter+" "+styles.tableBorder+" "+styles.flexTableRow}>
                                <span className={styles.tableMiddle31}>{item2.value}</span>
                                <span className={styles.rightBorder+" "+styles.tableMiddle32}>
                            {this.state.plainOptions1.map((item3,index)=>{
                            return (
                        <div className={styles.push1+" "+styles.flexFullItem}>
                        <Input type="number" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]} ref={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value}
                onChange={this.inputChange1.bind(this)} step="0.01"/></div>
                            )
                            
                        })}
                        <div className={styles.push1} style={{width:40}}>
                        <Checkbox checked={this.state["check-"+item.id+"-"+item1.id+"-"+item2.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id+"-"+item1.id+"-"+item2.id} name={"check-"+item.id+"-"+item1.id+"-"+item2.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox></div>
                                </span>
                                
                            </div>
                            }})}
                    </div>
                :""}
                
                
            </div>)
                            }})}
                    </div>
                :""}
                
                
                
            </div>
        })
    }
</div>:""
}

{/* 只有一个类别显示 西施*/}
{this.state.typeProduct.replace(/0/g,"").length==1?
<div id="class3" className={styles.positionAb+" "+
this.computeClassLabel()}>
{console.log(this.state.typeProduct.replace(/0/g,""))}
{this.state.data1.length>0?
    <div className={styles.tableMiddle2+" "+styles.flexTableColumn}>
        {this.state.data1.map((item,index)=>{
            return <div className={styles.aligncenter+" "+styles.tableBorder+" "+styles.flexTableRow}>
                <span className={styles.tableMiddle31}>{item.value}</span>
                <span className={styles.tableMiddle32}>
                {this.state.plainOptions1.map((item1,index)=>{
                    return (
                        <div className={styles.push1+" "+styles.flexFullItem}>
                        <Input type="number" value={this.state["io-"+item.id+"-"+item1.value]} ref={"io-"+item.id+"-"+item1.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.value}
                onChange={this.inputChange1.bind(this)} step="0.01"/></div>
                            )
                            
                        })}
                        <div className={styles.push1} style={{width:40}}>
                        <Checkbox checked={this.state["check-"+item.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id} name={"check-"+item.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox></div>
                </span>
                
                
            </div>
            })}
    </div>
:""}
</div>:""
}

<CheckboxGroup options={this.state.plainOptions} defaultValue={[]} onChange={this.onCheckChange.bind(this)} />

onCheckChange=(checkedValues) =>{
    console.log('checked = ', checkedValues);
    self.setState({
        checkedValues:checkedValues,
    })
    var ppscheckedValues=checkedValues;
    var ppsplainOptions=this.state.plainOptions;
    let empty1=[{value:"jichujiage",label:"基础价格"}];

    for(var index1=0; index1<ppscheckedValues.length; index1++){
        for(var index2=0; index2<ppsplainOptions.length; index2++){
            if(ppsplainOptions[index2].value==ppscheckedValues[index1]){
                empty1.push(ppsplainOptions[index2])
            }
        }
    }
    self.setState({
        plainOptions1:empty1,
        tdTypedata:empty1
    },()=>{
        var typeProduct1=this.state.typeProduct;
        var sdd=typeProduct1.replace(/0/g,"").length;
        self.setState({
            plainOptions1LENGTH1:sdd,
            plainOptions1LENGTH2:self.state.plainOptions1.length+1,
            plainOptions1LENGTH:sdd+self.state.plainOptions1.length+1,
        })
    })
    
}

	