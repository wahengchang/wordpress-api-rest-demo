(async () => {


    const api = require('./apis')

    const csvFilePath='./job10.csv'
    const csv=require('csvtojson')
    
    try {

        const jsonArray=await csv().fromFile(csvFilePath);

        let _jobId = ''
        let newSkillList = []

        for(let i=0 ; i<jsonArray.length; i++) {
        // for(let i=0; i<1; i++) {

            const item = jsonArray[i]
            // 1) create skill
            const {title, description, skillIds} = item
            const jobId = item['id (from job)']

            // if(jobId === '1102') continue

            if(!_jobId ) {
                _jobId = jobId
                console.log('[INIT] jobId: ', jobId)
            }
            else if(_jobId !== jobId) {
                // 2) add skill to Job
                const jobObj = await api.getJob(jobId)

                console.log('[INIT] going to to next')
                console.log('current -=-=-=-=-=-=-= _jobId -=-=-=-=-=-= : ', _jobId)
                console.log('current - newSkillList: ', newSkillList)

                // const updatedJobObj = await api.addSkillToJob(jobId, [...newSkillList])
                // console.log(`[Added] ${title} to job: ${updatedJobObj.title.raw}`)

                _jobId = jobId
                newSkillList = []
            }


            console.log(`[Goind to create skill] `, title, skillIds, jobId)

            const res = await api.createSkillOfJob({
                title,
                content: description,
                skillId: skillIds,
            })
            const newSkill = res
            const newSkillId = newSkill.id
            newSkillList.push(newSkillId)
        }
    

        console.log('current -=-=-=-=-=-=-= _jobId -=-=-=-=-=-= : ', _jobId)
        console.log('current - newSkillList: ', newSkillList)
        console.log('done')    
    }
    catch(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
    }
})()