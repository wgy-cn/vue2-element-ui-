
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = '//elm.cangdu.org' + url;
//1——跨域问题！我的版本请求两天前的数据会报错！仅仅是参数的不同！！！
//然而源码版本的数据不会有任何问题！
//2——为什么报错了还是可以获取到正确的数据，但是没法读取。。。


//0——闹鬼了，第二天源码完全正常了。以下是第一天的测试记录(不是定位城市API)

	//源码版本分三种情况：不带前缀时全部正常;  带前缀时2，5项异常;     加乱码后全部异常
	//我的版本分三种情况：带前缀时1,2项正常;  不带前缀时1,2项都不正常; 加乱码后全部异常
	//以上是在两者都不配置代理时
	//以下是在两者都配置代理时
	//我的版本分三种情况：带前缀时1,2项正常;  不带前缀时1,2项都不正常; 加乱码后全部异常

//我的版本 只要加了前缀：正常获取数据 + 没跨域警告，不加前缀就：全都没有数据 + 但没有跨域警告 ！
//而源码版本 加前缀时：跨域报错,2，5项异常; 不加前缀时：全部正常没跨域警告。   代理没有影响！

//我的版本 和 源码版本 的代理不影响数据获取
//不加前缀时指令的地址就是localhost，强制加了前缀后指令地址为elm.cangdu.org



	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	}else{
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}