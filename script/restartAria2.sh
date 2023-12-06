###
 # @Author: your name
 # @Date: 2021-10-16 02:49:39
 # @LastEditTime: 2021-10-16 02:50:56
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: /lexue/script/restartAria2.sh
### 

check_pid(){
	PID=`ps -ef| grep "aria2c"| grep -v grep| grep -v "aria2.sh"| grep -v "init.d"| grep -v "service"| awk '{print $2}'`
}
Restart_aria2(){
	check_pid
	[[ ! -z ${PID} ]] && /etc/init.d/aria2 stop
	/etc/init.d/aria2 start
}
Restart_aria2