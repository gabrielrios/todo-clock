var task_id = 0

var tasks_time = {}

function add_task() {
	task_name = prompt("Please shortly describe the task")
	
	if (task_name == null) {
		return
	}
	
	new_task_id = "task_" + task_id
	
	$("<div/>",  { id: new_task_id, "class":"task" }).appendTo("#content")
	
	new_task_id = "#"+new_task_id
	tasks_time[new_task_id] = { start: new Date(), timer: null, acc: 0 }
	
	$("<span/>", { text: task_name }).appendTo(new_task_id)
	
	createControlBar(new_task_id)
	
	$("<span/>", { "class":"clock"}).appendTo(new_task_id)
	
	attachControlEvents(new_task_id)
	
	task_id += 1
}

function createControlBar(task) {
	$("<span/>", { "class":"control" }).appendTo(task)

	$("<img/>", { src: "imgs/control_play.png", "class":"play"}).appendTo(task+ " span.control")
	
	$("<img/>", { src: "imgs/control_pause.png", "class":"pause"}).appendTo(task+ " span.control")
	
	$("<img/>", { src: "imgs/control_stop.png", "class":"stop"}).appendTo(task+ " span.control")
}

function attachControlEvents(task) {
	$(task + " span.control img.play").click(function() { doPlay(task) })
	$(task + " span.control img.pause").click(function() { doPause(task) })
	$(task + " span.control img.stop").click(function() { doStop(task) })
}

function doPlay(task) {
	tasks_time[task]["start"] = new Date()

	$(task + " span.control img.play").hide()
	$(task + " span.control img.pause").show()
	
	if (tasks_time[task]["timer"] == null) {
		$(task+" span.clock").text("00:00:00")
	}
	
	doClock(task)
	
	tasks_time[task]["timer"] = setInterval("doClock('"+task+"')", 1000)

}

function doPause(task) {
	tasks_time[task]["acc"] += new Date() - tasks_time[task]["start"]
	clearInterval(tasks_time[task]["timer"])
	$(task + " span.control img.play").show()
	$(task + " span.control img.pause").hide()
}

function doStop(task) {
	doPause(task)
	$(task + " span.control img.play").hide()
	$(task + " span.control img.stop").hide()
	$(task).removeClass("task").addClass("finished_task")
}

function doClock(task) {
	acc = tasks_time[task]["acc"]
	d = Math.floor((acc + (new Date() - tasks_time[task]["start"]))/1000)
	m = 0
	h = 0
	
	if (d >= 60) {
		m = Math.floor(d/60)
		d %=60
	} 
	
	if (m >= 60) {
		h = Math.floor(m/60)
		m %= 60
	}
	
	d += 100
	m += 100
	h += 100
	
	tot = ""+h+m+d
	
	
	$(task+" span.clock").text(tot.substring(1,3) + ":" + tot.substring(4,6) + ":" + tot.substring(7,9))
}
