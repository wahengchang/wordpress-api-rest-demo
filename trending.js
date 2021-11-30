(async () => {


    const api = require('./apis')

    const csvFilePath='./trending.csv'
    const csv=require('csvtojson')
    
    try {

        const jsonArray=await csv().fromFile(csvFilePath);

        for(let i=0; i<jsonArray.length; i++) {
            const item = jsonArray[i]
            // const item = jsonArray[0]
            // console.log(item.title, item.skillIds, item.jobPosting)
            // console.log(item)
            const {title, description,skillIds} = item

            const res = await api.createSkillOfTrend({
                title,
                content: description,
                skillId: skillIds,
                skillTypeId: item['id (from skillTypes)']
            })
    
            // console.log(res.data)
            console.log('done: ', title)
        }
    
    
        console.log('done')
    
        // const res = await api.get()
        // console.log(res)
    
    }
    catch(e) {
        console.log('ERROR',e.message)
    }
})()