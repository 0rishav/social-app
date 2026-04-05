#!/bin/bash

# --- CONFIG & COLORS ---
BG_DARK='\033[40m'
WHITE='\033[1;37m'
CYAN='\033[0;36m'
BLUE='\033[1;34m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# --- FUNCTION: DYNAMIC GRADIENT BAR ---
draw_bar() {
    local percent=$1
    local width=30
    local filled=$(($(($percent * $width)) / 100))
    local empty=$(($width - $filled))
    
    # Pick color based on intensity
    local color=$GREEN
    if [ "$percent" -gt 60 ]; then color=$YELLOW; fi
    if [ "$percent" -gt 85 ]; then color=$RED; fi

    printf "${WHITE}│${NC}"
    # Using Unicode Full Block █
    for ((i=0; i<filled; i++)); do printf "${color}█${NC}"; done
    for ((i=0; i<empty; i++)); do printf "${BG_DARK} ${NC}"; done
    
    printf " ${color}%3d%%${NC} " "$percent"
}

# --- HEADER ---
clear
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${WHITE}  🚀 KUBERNETES CLUSTER DASHBOARD - $(date +'%H:%M:%S')             ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════════╝${NC}"

# --- NODES SECTION ---
echo -e "\n${CYAN}📊 NODE RESOURCES${NC}"
echo -e "${WHITE}NODE            CPU USAGE                       MEMORY USAGE${NC}"
echo -e "──────────────  ──────────────────────────────  ──────────────────────────────"

kubectl top node --no-headers | while read -r line; do
    name=$(echo $line | awk '{print $1}')
    cpu_p=$(echo $line | awk '{print $3}' | tr -d '%')
    mem_p=$(echo $line | awk '{print $5}' | tr -d '%')
    
    printf "%-15s" "$name"
    draw_bar "$cpu_p"
    draw_bar "$mem_p"
    printf "\n"
done

# --- PODS SECTION ---
echo -e "\n${CYAN}📦 TOP 10 PODS BY MEMORY${NC}"
echo -e "${WHITE}STATUS    %-35s %-12s %-12s${NC}" "POD NAME" "CPU(m)" "MEM(Mi)"
echo -e "────────  %-35s %-12s %-12s" "───────────────────────────────────" "────────────" "────────────"

# Get statuses for extra "tagda" feel
kubectl get pods --no-headers | awk '{print $1,$3}' > /tmp/pod_status.txt

kubectl top pod --no-headers | sort -rk 3 | head -n 10 | while read -r line; do
    pname=$(echo $line | awk '{print $1}')
    pcpu=$(echo $line | awk '{print $2}')
    pmem=$(echo $line | awk '{print $3}')
    
    status=$(grep "^$pname " /tmp/pod_status.txt | awk '{print $2}')
    
    # Status color logic
    s_color=$GREEN
    if [ "$status" != "Running" ]; then s_color=$RED; fi

    printf "[${s_color}%-6s${NC}] %-35s %-12s %-12s\n" "$status" "$pname" "$pcpu" "$pmem"
done

echo -e "\n${BLUE}──────────────────────────────────────────────────────────────────────${NC}"
