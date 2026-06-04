const crypto = require("crypto");
const axios = require("axios");
const https = require("https");

const host = 'https://api.w32z7vtd.com';

const httpsAgent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: 50,
    maxFreeSockets: 10,
    scheduling: 'lifo',
    rejectUnauthorized: false
});

const axiosInstance = axios.create({
    httpsAgent,
    timeout: 10000,
    headers: {
        'Cache-Control': 'no-cache',
        'Version': '2406025',
        'PackageName': 'com.uf076bf0c246.qe439f0d5e.m8aaf56b725a.ifeb647346f',
        'Ver': '1.9.2',
        'Referer': host,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'okhttp/3.12.0'
    }
});

const privateKey = `-----BEGIN PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGAe6hKrWLi1zQmjTT1
ozbE4QdFeJGNxubxld6GrFGximxfMsMB6BpJhpcTouAqywAFppiKetUBBbXwYsYU
1wNr648XVmPmCMCy4rY8vdliFnbMUj086DU6Z+/oXBdWU3/b1G0DN3E9wULRSwcK
ZT3wj/cCI1vsCm3gj2R5SqkA9Y0CAwEAAQKBgAJH+4CxV0/zBVcLiBCHvSANm0l7
HetybTh/j2p0Y1sTXro4ALwAaCTUeqdBjWiLSo9lNwDHFyq8zX90+gNxa7c5EqcW
V9FmlVXr8VhfBzcZo1nXeNdXFT7tQ2yah/odtdcx+vRMSGJd1t/5k5bDd9wAvYdI
DblMAg+wiKKZ5KcdAkEA1cCakEN4NexkF5tHPRrR6XOY/XHfkqXxEhMqmNbB9U34
saTJnLWIHC8IXys6Qmzz30TtzCjuOqKRRy+FMM4TdwJBAJQZFPjsGC+RqcG5UvVM
iMPhnwe/bXEehShK86yJK/g/UiKrO87h3aEu5gcJqBygTq3BBBoH2md3pr/W+hUM
WBsCQQChfhTIrdDinKi6lRxrdBnn0Ohjg2cwuqK5zzU9p/N+S9x7Ck8wUI53DKm8
jUJE8WAG7WLj/oCOWEh+ic6NIwTdAkEAj0X8nhx6AXsgCYRql1klbqtVmL8+95KZ
K7PnLWG/IfjQUy3pPGoSaZ7fdquG8bq8oyf5+dzjE/oTXcByS+6XRQJAP/5ciy1b
L3NhUhsaOVy55MHXnPjdcTX0FaLi+ybXZIfIQ2P4rb19mVq1feMbCXhz+L1rG8oa
t5lYKfpe8k83ZA==
-----END PRIVATE KEY-----`;

const staticKeys = "Qmxi5ciWXbQzkr7o+SUNiUuQxQEf8/AVyUWY4T/BGhcXBIUz4nOyHBGf9A4KbM0iKF3yp9M7WAY0rrs5PzdTAOB45plcS2zZ0wUibcXuGJ29VVGRWKGwE9zu2vLwhfgjTaaDpXo4rby+7GxXTktzJmxvneOUdYeHi+PZsThlvPI=";
const token = '1be86e8e18a9fa18b2b8d5432699dad0.ac008ed650fd087bfbecf2fda9d82e9835253ef24843e6b18fcd128b10763497bcf9d53e959f5377cde038c20ccf9d17f604c9b8bb6e61041def86729b2fc7408bd241e23c213ac57f0226ee656e2bb0a583ae0e4f3bf6c6ab6c490c9a6f0d8cdfd366aacf5d83193671a8f77cd1af1ff2e9145de92ec43ec87cf4bdc563f6e919fe32861b0e93b118ec37d8035fbb3c.59dd05c5d9a8ae726528783128218f15fe6f2c0c8145eddab112b374fcfe3d79';

const CLASSES = [
    { type_id: "1", type_name: "电影" },
    { type_id: "2", type_name: "电视剧" },
    { type_id: "4", type_name: "动漫" },
    { type_id: "3", type_name: "综艺" },
    { type_id: "64", type_name: "短剧" }
];

const FILTERS = {
    '1': [
        { 
            key: 'year', 
            name: '年份', 
            value: [
                { n: '全部', v: '0' },
                { n: '2025', v: '2025' },
                { n: '2024', v: '2024' },
                { n: '2023', v: '2023' },
                { n: '2022', v: '2022' },
                { n: '2021', v: '2021' },
                { n: '2020', v: '2020' },
                { n: '2019', v: '2019' },
                { n: '2018', v: '2018' },
                { n: '2017', v: '2017' },
                { n: '2016', v: '2016' },
                { n: '2015', v: '2015' },
                { n: '2014', v: '2014' },
                { n: '2013', v: '2013' },
                { n: '2012', v: '2012' },
                { n: '2011', v: '2011' },
                { n: '2010', v: '2010' },
                { n: '2009', v: '2009' },
                { n: '2008', v: '2008' },
                { n: '2007', v: '2007' },
                { n: '2006', v: '2006' },
                { n: '2005', v: '2005' },
                { n: '更早', v: '2004' }
            ]
        },
        { 
            key: 'area', 
            name: '地区', 
            value: [
                { n: '全部', v: '0' },
                { n: '大陆', v: '大陆' },
                { n: '香港', v: '香港' },
                { n: '台湾', v: '台湾' },
                { n: '美国', v: '美国' },
                { n: '韩国', v: '韩国' },
                { n: '日本', v: '日本' },
                { n: '英国', v: '英国' },
                { n: '法国', v: '法国' },
                { n: '泰国', v: '泰国' },
                { n: '印度', v: '印度' },
                { n: '其他', v: '其他' }
            ]
        },
        { 
            key: 'sort', 
            name: '排序', 
            value: [
                { n: '最新', v: 'd_id' },
                { n: '最热', v: 'd_hits' },
                { n: '推荐', v: 'd_score' }
            ]
        }
    ],
    '2': [
        { 
            key: 'year', 
            name: '年份', 
            value: [
                { n: '全部', v: '0' },
                { n: '2025', v: '2025' },
                { n: '2024', v: '2024' },
                { n: '2023', v: '2023' },
                { n: '2022', v: '2022' },
                { n: '2021', v: '2021' },
                { n: '2020', v: '2020' },
                { n: '2019', v: '2019' },
                { n: '2018', v: '2018' },
                { n: '2017', v: '2017' },
                { n: '2016', v: '2016' },
                { n: '2015', v: '2015' },
                { n: '2014', v: '2014' },
                { n: '2013', v: '2013' },
                { n: '2012', v: '2012' },
                { n: '2011', v: '2011' },
                { n: '2010', v: '2010' },
                { n: '2009', v: '2009' },
                { n: '2008', v: '2008' },
                { n: '2007', v: '2007' },
                { n: '2006', v: '2006' },
                { n: '2005', v: '2005' },
                { n: '更早', v: '2004' }
            ]
        },
        { 
            key: 'area', 
            name: '地区', 
            value: [
                { n: '全部', v: '0' },
                { n: '大陆', v: '大陆' },
                { n: '香港', v: '香港' },
                { n: '台湾', v: '台湾' },
                { n: '美国', v: '美国' },
                { n: '韩国', v: '韩国' },
                { n: '日本', v: '日本' },
                { n: '英国', v: '英国' },
                { n: '法国', v: '法国' },
                { n: '泰国', v: '泰国' },
                { n: '印度', v: '印度' },
                { n: '其他', v: '其他' }
            ]
        },
        { 
            key: 'sort', 
            name: '排序', 
            value: [
                { n: '最新', v: 'd_id' },
                { n: '最热', v: 'd_hits' },
                { n: '推荐', v: 'd_score' }
            ]
        }
    ],
    '4': [
        { 
            key: 'year', 
            name: '年份', 
            value: [
                { n: '全部', v: '0' },
                { n: '2025', v: '2025' },
                { n: '2024', v: '2024' },
                { n: '2023', v: '2023' },
                { n: '2022', v: '2022' },
                { n: '2021', v: '2021' },
                { n: '2020', v: '2020' },
                { n: '2019', v: '2019' },
                { n: '2018', v: '2018' },
                { n: '2017', v: '2017' },
                { n: '2016', v: '2016' },
                { n: '2015', v: '2015' }
            ]
        },
        { 
            key: 'area', 
            name: '地区', 
            value: [
                { n: '全部', v: '0' },
                { n: '大陆', v: '大陆' },
                { n: '日本', v: '日本' },
                { n: '美国', v: '美国' },
                { n: '其他', v: '其他' }
            ]
        },
        { 
            key: 'sort', 
            name: '排序', 
            value: [
                { n: '最新', v: 'd_id' },
                { n: '最热', v: 'd_hits' },
                { n: '推荐', v: 'd_score' }
            ]
        }
    ],
    '3': [
        { 
            key: 'year', 
            name: '年份', 
            value: [
                { n: '全部', v: '0' },
                { n: '2025', v: '2025' },
                { n: '2024', v: '2024' },
                { n: '2023', v: '2023' },
                { n: '2022', v: '2022' }
            ]
        },
        { 
            key: 'area', 
            name: '地区', 
            value: [
                { n: '全部', v: '0' },
                { n: '大陆', v: '大陆' },
                { n: '台湾', v: '台湾' },
                { n: '韩国', v: '韩国' }
            ]
        },
        { 
            key: 'sort', 
            name: '排序', 
            value: [
                { n: '最新', v: 'd_id' },
                { n: '最热', v: 'd_hits' },
                { n: '推荐', v: 'd_score' }
            ]
        }
    ],
    '64': [
        { 
            key: 'year', 
            name: '年份', 
            value: [
                { n: '全部', v: '0' },
                { n: '2025', v: '2025' },
                { n: '2024', v: '2024' },
                { n: '2023', v: '2023' }
            ]
        },
        { 
            key: 'sort', 
            name: '排序', 
            value: [
                { n: '最新', v: 'd_id' },
                { n: '最热', v: 'd_hits' },
                { n: '推荐', v: 'd_score' }
            ]
        }
    ]
};

const cache = {
    data: new Map(),
    ttl: {
        category: 300000,
        detail: 600000,
        play: 300000,
        search: 60000
    },
    get: (key) => {
        const item = cache.data.get(key);
        if (!item) return null;
        if (Date.now() > item.expire) {
            cache.data.delete(key);
            return null;
        }
        return item.data;
    },
    set: (key, data, type = 'category') => {
        cache.data.set(key, {
            data,
            expire: Date.now() + cache.ttl[type]
        });
        if (cache.data.size > 200) cache.data.clear();
    }
};

const rsaTool = {
    decode: (data) => {
        if (!data) return null;
        try {
            const buffer = Buffer.from(data, 'base64');
            const blockSize = 256;
            let decryptedParts = [];

            for (let i = 0; i < buffer.length; i += blockSize) {
                const chunk = buffer.slice(i, i + blockSize);
                const decChunk = crypto.privateDecrypt({
                    key: privateKey,
                    padding: crypto.constants.RSA_NO_PADDING,
                }, chunk);
                
                let start = 0;
                while(start < decChunk.length && decChunk[start] === 0) start++;
                const realStart = decChunk.indexOf(0, 2); 
                
                if (realStart !== -1) {
                    decryptedParts.push(decChunk.slice(realStart + 1));
                } else {
                    decryptedParts.push(decChunk.slice(start));
                }
            }
            return Buffer.concat(decryptedParts).toString('utf8').trim();
        } catch (e) {
            return null;
        }
    }
};

const cryptoTool = {
    md5: (text) => crypto.createHash('md5').update(text).digest('hex'),
    aesEncrypt: (text) => {
        try {
            const key = Buffer.from('mvXBSW7ekreItNsT', 'utf8');
            const iv = Buffer.from('2U3IrJL8szAKp0Fj', 'utf8');
            const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted.toUpperCase();
        } catch { return ''; }
    },
    aesDecrypt: (text, keyStr, ivStr) => {
        try {
            const key = Buffer.from(keyStr, 'utf8');
            const iv = Buffer.from(ivStr, 'utf8');
            const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
            let decrypted = decipher.update(text, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch { return ''; }
    },
    generateSignature: (requestKey, timestamp) => {
        const signStr = `token_id=,token=${token},phone_type=1,request_key=${requestKey},app_id=1,time=${timestamp},keys=${staticKeys}*&zvdvdvddbfikkkumtmdwqppp?|4Y!s!2br`;
        return cryptoTool.md5(signStr);
    }
};

const API_PATHS = {
    INDEX_LIST: '/App/IndexList/indexList',
    PLAY_INFO: '/App/IndexPlay/playInfo',
    VURL_SHOW: '/App/Resource/Vurl/show',
    VURL_DETAIL: '/App/Resource/VurlDetail/showOne',
    FIND_MORE: '/App/Index/findMoreVod'
};

const apiRequest = async (data, path, cacheType = 'category', retries = 1) => {
    const cacheKey = `${path}|${JSON.stringify(data)}`;
    
    if (cacheType !== 'none') {
        const cached = cache.get(cacheKey);
        if (cached) return cached;
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const requestKey = cryptoTool.aesEncrypt(JSON.stringify(data));
    if (!requestKey) return null;
    const signature = cryptoTool.generateSignature(requestKey, timestamp);

    const postBody = new URLSearchParams({
        token: token,
        token_id: '',
        phone_type: '1',
        time: timestamp,
        phone_model: 'xiaomi-22021211rc',
        keys: staticKeys,
        request_key: requestKey,
        signature,
        app_id: '1',
        ad_version: '1'
    }).toString();

    let lastError = null;
    for (let i = 0; i <= retries; i++) {
        try {
            const response = await axiosInstance.post(`${host}${path}`, postBody);
            
            if (response.status !== 200 || !response.data?.data) throw new Error("API Error");

            const keysData = rsaTool.decode(response.data.data.keys);
            if (!keysData) throw new Error("RSA Decode Error");

            const keys = JSON.parse(keysData);
            const decryptedData = cryptoTool.aesDecrypt(
                response.data.data.response_key,
                keys.key,
                keys.iv
            );

            if (!decryptedData) throw new Error("AES Decode Error");
            
            const result = JSON.parse(decryptedData);
            
            if (cacheType !== 'none' && result) {
                cache.set(cacheKey, result, cacheType);
            }
            return result;
        } catch (e) {
            lastError = e;
        }
    }
    return null;
};

const getResolutionScore = (res) => {
    const r = res.toLowerCase().replace('p', '');
    if (r === '8k') return 100;
    if (r === '4k' || r === '2160') return 90;
    if (r === '1440') return 80;
    if (r === '1080') return 70;
    if (r === '720') return 60;
    if (r === '超清') return 50;
    if (r === '高清') return 40;
    if (r === '标清') return 30;
    return 10;
}

const _home = async ({ filter }) => {
    return {
        class: CLASSES,
        filters: FILTERS
    };
};

const _category = async ({ id, page, filters = {} }) => {
    const area = filters.area || '0';
    const year = filters.year || '0';
    const sort = filters.sort || 'd_id';
    
    const pg = parseInt(page || 1);
    
    const data = await apiRequest({
        area: area,
        year: year,
        pageSize: "20",
        sort: sort,
        page: pg.toString(),
        tid: id
    }, API_PATHS.INDEX_LIST, 'category');

    if (!data || !data.list) {
        return { list: [], page: pg, pagecount: 0 };
    }

    const totalPage = parseInt(data.totalPage || 0);

    return {
        list: data.list.map(item => ({
            vod_id: `${item.vod_id}/${item.vod_continu || 0}`,
            vod_name: item.vod_name,
            vod_pic: item.vod_pic,
            vod_remarks: (item.vod_continu || 0) === 0 ? '电影' : `更新至${item.vod_continu}集`
        })),
        page: pg,
        pagecount: totalPage === 0 ? 999 : totalPage,
    };
};

const _detail = async ({ id }) => {
    const ids = Array.isArray(id) ? id : [id];
    const results = [];

    await Promise.all(ids.map(async (idStr) => {
        try {
            const vodId = idStr.split('/')[0];
            
            const [detailData, playData] = await Promise.all([
                apiRequest({
                    token_id: "1649412",
                    vod_id: vodId,
                    mobile_time: Math.floor(Date.now() / 1000).toString(),
                    token: token
                }, API_PATHS.PLAY_INFO, 'detail'),
                apiRequest({
                    vurl_cloud_id: "2",
                    vod_d_id: vodId
                }, API_PATHS.VURL_SHOW, 'detail')
            ]);

            if (!detailData?.vodInfo) return;

            const vod = detailData.vodInfo;
            const video = {
                vod_id: vodId,
                vod_name: vod.vod_name,
                vod_pic: vod.vod_pic,
                vod_year: vod.vod_year,
                vod_area: vod.vod_area,
                vod_actor: vod.vod_actor,
                vod_content: (vod.vod_use_content || '').trim(),
                vod_play_from: "瓜子专线",
                vod_play_url: ""
            };

            const playList = [];
            if (playData?.list) {
                playData.list.forEach((item, index) => {
                    if (!item.play) return;
                    
                    const resolutions = [];
                    const params = [];
                    
                    for (const [key, val] of Object.entries(item.play)) {
                        if (val.param) {
                            resolutions.push(key);
                            params.push(val.param);
                        }
                    }

                    if (params.length > 0) {
                        resolutions.sort((a, b) => getResolutionScore(b) - getResolutionScore(a));
                        const playName = playData.list.length === 1 ? (vod.vod_name || '正片') : (item.name || (index + 1).toString());
                        const playUrl = `${params[0]}||${resolutions.join('@')}`;
                        playList.push(`${playName}$${playUrl}`);
                    }
                });
            }
            video.vod_play_url = playList.join('#');
            results.push(video);
        } catch (e) {
        }
    }));

    return { list: results };
};

// 修改后的搜索函数
const _search = async ({ page, quick, wd }) => {
    const pg = parseInt(page || 1);
    
    if (!wd) return { list: [], page: pg, pagecount: 0 };

    const data = await apiRequest({
        keywords: wd,
        order_val: "1",
        page: pg.toString()
    }, API_PATHS.FIND_MORE, 'search');

    if (!data || !data.list) return { list: [], page: pg, pagecount: 0 };

    const totalPage = parseInt(data.totalPage || 0);

    // 关键点：对 API 返回结果进行二次过滤，确保标题中包含关键词
    const filteredList = data.list
        .filter(item => item.vod_name && item.vod_name.toLowerCase().includes(wd.toLowerCase()))
        .map(item => ({
            vod_id: `${item.vod_id}/${item.vod_continu || 0}`,
            vod_name: item.vod_name,
            vod_pic: item.vod_pic,
            vod_remarks: (item.vod_continu || 0) === 0 ? '电影' : `更新至${item.vod_continu}集`
        }));

    return {
        list: filteredList,
        page: pg,
        pagecount: totalPage === 0 ? 1 : totalPage,
    };
};

const _play = async ({ flag, flags, id }) => {
    try {
        const parts = id.split('||');
        if (parts.length < 2) return { parse: 0, url: '' };

        const paramStr = parts[0];
        const resolutions = parts[1].split('@');
        
        const params = {};
        paramStr.split('&').forEach(pair => {
            const [k, v] = pair.split('=');
            if (k) params[k] = v || '';
        });

        if (resolutions.length > 0) {
            resolutions.sort((a, b) => getResolutionScore(b) - getResolutionScore(a));
            params.resolution = resolutions[0];
        }

        const data = await apiRequest(params, API_PATHS.VURL_DETAIL, 'play');
        
        return { 
            parse: 0, 
            url: data?.url || '' 
        };
    } catch {
        return { parse: 0, url: '' };
    }
};

const meta = {
    key: "GuaZiAPP",
    name: "瓜子[APP][优]",
    type: 4,
    api: "/video/GuaZiAPP"
};

module.exports = async (app, opt) => {
    app.get(meta.api, async (req, reply) => {
        const { extend, filter, t, ac, pg, ext, ids, play, wd, quick } = req.query;
        if (play) {
            return await _play({ id: play });
        } else if (wd) {
            return await _search({ page: parseInt(pg || "1"), quick: quick || false, wd });
        } else if (!ac) {
            return await _home({ filter: filter ?? false });
        } else if (ac === "detail") {
            if (t) {
                let filterObj = {};
                if (ext) {
                    try {
                        const decoded = Buffer.from(ext, 'base64').toString('utf-8');
                        filterObj = JSON.parse(decoded);
                    } catch (e) {
                        console.error('解析筛选参数失败:', e);
                    }
                }
                return await _category({ 
                    id: t, 
                    page: parseInt(pg || "1"), 
                    filters: filterObj 
                });
            } else if (ids) {
                return await _detail({ id: ids.split(",").map(v => v.trim()) });
            }
        }
        return req.query;
    });
    opt.sites.push(meta);
};
