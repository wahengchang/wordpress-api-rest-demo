var axios = require('axios');

const {API_URL, APP_TOKEN, BASE_3rd_API} = process.env
const get = async () => {

    var config = {
        method: 'get',
        url: `${API_URL}/wp-json/wp/v2/skill_type`,
        headers: { }
    };
    
    const response = await axios(config)
    return response.data
}

const getJob = async (id) => {

  var config = {
      method: 'get',
      url: `${API_URL}/wp-json/wp/v2/jobs/${id}`,
      headers: { }
  };
  
  console.log('url: ', config.url)

  const response = await axios(config)
  return response.data
}

const addSkillToJob = async (id, acfSkillSet = []) => {

  console.log('acfSkillSet: ', acfSkillSet)

  var data = JSON.stringify({"acf":{
    "required_skill_set":[...acfSkillSet]
  }});

  var config = {
    method: 'put',
    url: `${API_URL}/wp-json/wp/v2/jobs/${id}`,
    headers: { 
      'Authorization': `Basic ${APP_TOKEN}`, 
      'Content-Type': 'application/json'
    },
    data : data
  };

  const response = await axios(config)
  return response.data
}


const createSkillOfJob = async (payload = {}) => {
  const {title, content = '', skillId} = payload
  const status = 'publish'

  if(!title || !skillId) {
      throw new Error('title, skillId are all required')
  }

  const data = JSON.stringify({
      "acf": {
        "skill_id": skillId
      }
    });
    
    const config = {
      method: 'post',
      url: `${API_URL}/wp-json/wp/v2/skills?content=${encodeURI(content)}&title=${encodeURI(title)}&status=${status}`,
      headers: { 
        'Authorization': `Basic ${APP_TOKEN}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    const response = await axios(config)
    return response.data
}


const createSkillOfTrend = async (payload = {}) => {
  const {title, content = '', skillId, skillTypeId} = payload
  const status = 'publish'

  if(!title || !skillId) {
      throw new Error('title, skillId are all required')
  }

  const data = JSON.stringify({
      "acf": {
        "skill_id": skillId
      },
      "skill_type": [skillTypeId]
    });
    
    const config = {
      method: 'post',
      url: `${API_URL}/wp-json/wp/v2/skills?content=${encodeURI(content)}&title=${encodeURI(title)}&status=${status}`,
      headers: { 
        'Authorization': `Basic ${APP_TOKEN}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    const response = await axios(config)
    return response.data
}

const createSkill = async (payload = {}) => {
    const {job_postings, title, content, skillId, skillTypeId} = payload
    const status = 'publish'

    if(!job_postings || !title ||!content || !skillId || !skillTypeId) {
        throw new Error('job_postings, title, content, skillId, skillTypeId are all required')
    }

    const data = JSON.stringify({
        "acf": {
          "job_postings": job_postings,
          "skill_id": skillId
        },
        "skill_type": [skillTypeId]
      });
      
      const config = {
        method: 'post',
        url: `${API_URL}/wp-json/wp/v2/skills?content=${content}&title=${title}&status=${status}`,
        headers: { 
          'Authorization': `Basic ${APP_TOKEN}`, 
          'Content-Type': 'application/json'
        },
        data : data
      };

      const response = await axios(config)
      return response.data
}

const getCourseBySkill = async (id) => {

  var config = {
    method: 'get',
    url: `${BASE_3rd_API}/v3/courses/all?sourceType=ZPLUS&skillId=${id}2&page=0&size=5
    `,
    headers: { }
  };

  const response = await axios(config)
  return response.data

}


module.exports = {
    get,
    createSkill,
    createSkillOfJob,
    getJob,
    addSkillToJob,
    getCourseBySkill,
    createSkillOfTrend
}