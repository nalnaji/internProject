import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)

INF = 4

GPIO.setup(INF,GPIO.IN)

while GPIO.input(INF)==0:
	pass

print 'MOTION FOUND'

GPIO.cleanup()


while !wasThereMotionInTheLast5Seconds(){
	sleep(2 seconds);
}