(function(){
	// 设置rem
	var rootEl = document.documentElement,
		ratio = 37.5
	function setRem() {
			// maxWidth = 540,
			// minWidth = 320,
		var viewWidth = window.innerWidth || rootEl.getBoundingClientRect().width
		rootEl.style.fontSize = viewWidth/ratio + 'px'
	}
	setRem()
	window.addEventListener('resize',setRem)
})()