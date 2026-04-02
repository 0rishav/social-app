@echo off
TITLE Kafka Stack Starter

:: 1. Java Home Set Karo
set "JAVA_HOME=C:\Users\risha\AppData\Local\Programs\Eclipse Adoptium\jdk-17.0.18.8-hotspot"

:: 2. Zookeeper Start Karo (Naye Window Mein)
echo Starting Zookeeper in a new window...
start "Zookeeper" cmd /k "cd /d C:\kafka && .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties"

:: 3. 10 Second ka wait (Taki Zookeeper puri tarah ready ho jaye)
echo Waiting for Zookeeper to be ready...
timeout /t 10 /nobreak

:: 4. Kafka Start Karo (Naye Window Mein)
echo Starting Kafka in a new window...
set "KAFKA_HEAP_OPTS=-Xmx1G -Xms1G"
start "Kafka Broker" cmd /k "cd /d C:\kafka && .\bin\windows\kafka-server-start.bat .\config\server.properties"

echo.
echo ==========================================
echo Dono Servers start ho rahe hain! 
echo In windows ko band mat karna, minimize kar do.
echo ==========================================
pause