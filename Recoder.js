
(function(){
	function Recoder (){
		this.getWediaStream();
	}
	Recoder.prototype.getWediaStream = function(){
		var config = {
					audio:true,
					video:true
		};
		var self = this;
		//缓存数组 把数据放到这里面
		this.buffers = [];
		function success(stream){
//			console.log(stream);
		 self.mediaRecoder =  new MediaRecorder(stream);
		 //监听有效数据，把有效数据放到缓存数组
		 self.mediaRecoder.ondataavailable=function(event){
//				console.log(event.data);
				self.buffers.push(event.data);
				console.log(event.data);
			};
			self.addEventListener();						
		}
		function fail (error){
			console.log(error);
		}
		navigator.mediaDevices.getUserMedia(config).then(success).catch(fail);
	
	
	};
	Recoder.prototype.addEventListener = function(){
		var self = this;
		this.mediaRecoder.addEventListener("stop",function(){
			//监听到停止后，把数组解析成 二进制数据
			var blob = new Blob(self.buffers,{mimeType:"video/webm"});
			var url= URL.createObjectURL(blob);
			var audio= document.createElement('audio');
			audio.src = url;
			document.body.appendChild(audio);
			audio.autoplay = true;
			audio.onended = function(){
				document.body.removeChild(this);
			}
			var downloadButton =  document.createElement('a');
			downloadButton.textContent = "保存到本地";
			downloadButton.href = url;
			downloadButton.download = url;
			document.body.appendChild(downloadButton) ;
		});
	};
	Recoder.prototype.recoder = function(){
		
		if (this.mediaRecoder.state == "paused") {
			this.mediaRecoder.resume();
		} else{
			this.start();
		}
		
	}
	Recoder.prototype.start = function(){
		if (this.mediaRecoder.state == "recording") {
			return ;
		}  
		this.mediaRecoder.start();
	}
	Recoder.prototype.pause = function(){
		this.mediaRecoder.pause();
	}
	Recoder.prototype.stop = function(){
		this.mediaRecoder.stop();
	}
	window.Recoder =Recoder;
}());
