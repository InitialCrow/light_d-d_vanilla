(function(ctx){
	var drag = {
		'storage' : {
			'closeBtn' : []
		},
		'up' : {
			'indexCount' : 0,
			'poolFiles' : [],

			'dragover' : function(ev){
				console.log('over drop')
			},
			'drop' : function(ev, callback){
				ev.preventDefault();

				var callback = callback || false
				self.up.poolFiles.push(ev.dataTransfer.files[0])

				self.up.indexCount ++

				if(callback){
					return callback(ev.dataTransfer.files[0], ev.target)
				}
				else{

					return {file : ev.dataTransfer.files, target :ev.target}
				}

			},
			'remove' : function(i, callback){
				var callback = callback || false
				self.up.poolFiles.splice(i,1)
				self.up.indexCount --
				if(callback){
					return callback(i)
				}
				else{
					return i
				}
			}

		},
		'tools' : {
			'genURL' : function(base, uri, callback){
				var url = base + uri
				var callback = callback || false

				if(callback){
					return callback(url)
				}
				else{
					return url
				}

			},

		},
		'form' : {
			'submit': function(form, loader, callback){
				var callback = callback || false
				var loader = loader || false
				var form = document.getElementById(form) || false
				if(form){

					var formData  = new FormData(form)
					for(i=0; i<self.up.poolFiles.length; i++ ){

						formData.append('files[]',self.up.poolFiles[i])
					}


					var request = new XMLHttpRequest()
					request.open("POST", form.action)
					if(loader){
						var elem =document.getElementById(loader)
						elem.innerHTML = "<img src='/assets/global/img/loading.gif'>";

					}
					request.send(formData)

					request.onreadystatechange = function() { // Call a function when the state changes.

						if (request.readyState == XMLHttpRequest.DONE) {
						// Request finished. Do processing here.
							if(loader){
								elem.innerHTML = ""
							}
							if(callback){
								return callback(request)
							}
							else{
								return request
							}
						}

					}
				}
			},
		}


	}

	ctx.drag = drag
	var self = ctx.drag
})(window)
