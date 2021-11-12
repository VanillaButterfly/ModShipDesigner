import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {

/*Variable Definition*/

  onceever = 0;
  queryString = window.location.search;
  urlParams = new URLSearchParams(this.queryString);

  // Currently selected hull, by number id
  set = 0;

  //Technology summary table. Contains the ids of each technology checkbox
  tech_table = ["magnetic_fuze", "acoustic_torpedo", "torpex", "basic_light_shell", "improved_light_shell", "advanced_light_shell", "basic_heavy_shell", "improved_heavy_shell", "advanced_heavy_shell", "improved_submarine_mine_laying"]

  /*Hull IDs
    0 - DD
    1 - CL
    2 - CA
    3 - CVL
    4 - BB
    5 - CV
    6 - SS
  */

  //Base stats table per hull in hull index order. Refer to the above commentary for hull index, or to the return() function if said commentary is not up-to-date
  naval_speed = [ 0, 0, 0, 0, 0, 0, 0 ];

  naval_range = [ 2500, 3500, 3500, 3500, 4000, 4000, 4000 ];
  
  max_organisation = [ 40, 40, 40, 40, 40, 40, 40 ];
  
  max_strength = [ 50, 100, 100, 100, 300, 300, 30 ];
  
  reliability = [ 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5 ];
  
  supply_consumption = [ 0.02, 0.1, 0.1, 0.1, 0.5, 0.5, 0.01 ];
  
  manpower = [ 100, 800, 800, 800, 3000, 3000, 50 ];
  
  carrier_size = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  lg_attack = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  lg_armor_piercing = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  hg_attack = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  hg_armor_piercing = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  torpedo_attack = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  sub_attack = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  armor_value = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  anti_air_attack = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  fuel_consumption = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  surface_visibility = [ 10, 15, 15, 15, 25, 25, 1 ];
  
  surface_detection = [ 15, 20, 20, 20, 20, 20, 10 ];
  
  sub_visibility = [ 0, 0, 0, 0, 0, 0, 15 ];
  
  sub_detection = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  mines_planting = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  mines_sweeping = [ 0, 0, 0, 0, 0, 0, 0 ];
  
  build_cost_ic = [ 600, 2000, 2000, 2000, 3000, 3000, 300 ];
  
  steel = [ 2, 2, 2, 2, 4, 4, 2 ];
  
  chromium = [ 0, 0, 0, 0, 0, 0, 0 ];

  //Stat Addition per equipment piece
  add = {
    naval_speed : {light_ship_deprecated_engine:20, light_ship_range_engine_1:28, light_ship_range_engine_2:30, light_ship_range_engine_3:32, light_ship_range_engine_4:34, light_ship_perf_engine_1:37, light_ship_perf_engine_2:40, light_ship_perf_engine_3:43, light_ship_perf_engine_4:46,
      medium_ship_deprecated_engine:22, medium_ship_range_engine_1:29, medium_ship_range_engine_2:31, medium_ship_range_engine_3:33, medium_ship_range_engine_4:35, medium_ship_perf_engine_1:39, medium_ship_perf_engine_2:43, medium_ship_perf_engine_3:47, medium_ship_perf_engine_4:51,
      heavy_ship_deprecated_engine:23, heavy_ship_range_engine_1:26, heavy_ship_range_engine_2:29, heavy_ship_range_engine_3:32, heavy_ship_range_engine_4:35, heavy_ship_perf_engine_1:36, heavy_ship_perf_engine_2:42, heavy_ship_perf_engine_3:48, heavy_ship_perf_engine_4:54,
      sub_ship_deprecated_engine:12, sub_ship_engine_1:14, sub_ship_engine_2:16, sub_ship_engine_3:18, sub_ship_engine_4:20},
    naval_range : {},
    max_organisation : {},
    max_strength : {ship_light_battery_1:2, ship_light_battery_2:3, ship_light_battery_3:4, ship_light_battery_4:5,
      ship_light_medium_battery_1:10, ship_light_medium_battery_2:15, ship_light_medium_battery_3:20, ship_light_medium_battery_4:25,
      ship_heavy_medium_battery_1:10, ship_heavy_medium_battery_2:15, ship_heavy_medium_battery_3:20, ship_heavy_medium_battery_4:25,
      ship_heavy_battery_1:20, ship_heavy_battery_2:30, ship_heavy_battery_3:40, ship_heavy_battery_4:50,
      light_ship_range_engine_2:5, light_ship_range_engine_3:10, light_ship_range_engine_4:15, light_ship_perf_engine_2:5, light_ship_perf_engine_3:10, light_ship_perf_engine_4:15,
      medium_ship_range_engine_2:10, medium_ship_range_engine_3:20, medium_ship_range_engine_4:30, medium_ship_perf_engine_2:10, medium_ship_perf_engine_3:20, medium_ship_perf_engine_4:30,
      heavy_ship_range_engine_2:20, heavy_ship_range_engine_3:40, heavy_ship_range_engine_4:60, heavy_ship_perf_engine_2:20, heavy_ship_perf_engine_3:40, heavy_ship_perf_engine_4:60,
      sub_ship_engine_2:5, sub_ship_engine_3:10, sub_ship_engine_4:15,
      ship_torpedo_1:2, ship_torpedo_2:2,
      ship_airplane_launcher:2,
      ship_deck_space:10, ship_large_deck_space:20},
    reliability : {ship_light_battery_1:0.03, ship_light_battery_2:0.03, ship_light_battery_3:0.03, ship_light_battery_4:0.03,
      ship_light_medium_battery_1:0.03, ship_light_medium_battery_2:0.03, ship_light_medium_battery_3:0.03, ship_light_medium_battery_4:0.03,
      ship_heavy_medium_battery_1:0.03, ship_heavy_medium_battery_2:0.03, ship_heavy_medium_battery_3:0.03, ship_heavy_medium_battery_4:0.03,
      ship_heavy_battery_1:0.03, ship_heavy_battery_2:0.03, ship_heavy_battery_3:0.03, ship_heavy_battery_4:0.03,
	  light_ship_range_engine_1:0.02, light_ship_range_engine_2:0.02, light_ship_range_engine_3:0.02, light_ship_range_engine_4:0.02,
      medium_ship_range_engine_1:0.02, medium_ship_range_engine_2:0.02, medium_ship_range_engine_3:0.02, medium_ship_range_engine_4:0.02,
      heavy_ship_range_engine_1:0.02, heavy_ship_range_engine_2:0.02, heavy_ship_range_engine_3:0.02, heavy_ship_range_engine_4:0.02,
      sub_ship_engine_1:0.02, sub_ship_engine_2:0.02, sub_ship_engine_3:0.02, sub_ship_engine_4:0.02,
	  ship_torpedo_1:0.03, ship_torpedo_2:0.03,
	  ship_torpedo_sub_1:0.03, ship_torpedo_sub_2:0.03},
    supply_consumption : {ship_light_battery_1:0.01, ship_light_battery_2:0.01, ship_light_battery_3:0.01, ship_light_battery_4:0.01,
      ship_light_medium_battery_1:0.02, ship_light_medium_battery_2:0.03, ship_light_medium_battery_3:0.04, ship_light_medium_battery_4:0.05,
      ship_heavy_medium_battery_1:0.02, ship_heavy_medium_battery_2:0.03, ship_heavy_medium_battery_3:0.04, ship_heavy_medium_battery_4:0.05,
      ship_heavy_battery_1:0.06, ship_heavy_battery_2:0.08, ship_heavy_battery_3:0.1, ship_heavy_battery_4:0.12,
      ship_torpedo_1:0.01, ship_torpedo_2:0.01,
      ship_torpedo_sub_1:0.01, ship_torpedo_sub_2:0.01,
      ship_mine_layer:0.01,
      ship_mine_layer_sub:0.01,
      ship_depth_charge_1:0.01, ship_depth_charge_2:0.01, ship_depth_charge_3:0.01, ship_depth_charge_4:0.01,
      ship_airplane_launcher:0.01,
      ship_deck_space:0.05, ship_large_deck_space:0.15},
    manpower : {ship_light_battery_1:40, ship_light_battery_2:40, ship_light_battery_3:40, ship_light_battery_4:40,
      ship_light_medium_battery_1:100, ship_light_medium_battery_2:100, ship_light_medium_battery_3:100, ship_light_medium_battery_4:100,
      ship_heavy_medium_battery_1:100, ship_heavy_medium_battery_2:100, ship_heavy_medium_battery_3:100, ship_heavy_medium_battery_4:100,
      ship_heavy_battery_1:160, ship_heavy_battery_2:160, ship_heavy_battery_3:160, ship_heavy_battery_4:160,
      ship_anti_air_1:20, ship_anti_air_2:20, ship_anti_air_3:20, ship_anti_air_4:20,
      light_ship_deprecated_engine:60, light_ship_range_engine_1:40, light_ship_range_engine_2:40, light_ship_range_engine_3:40, light_ship_range_engine_4:40, light_ship_perf_engine_1:60, light_ship_perf_engine_2:60, light_ship_perf_engine_3:60, light_ship_perf_engine_4:60,
      medium_ship_deprecated_engine:90, medium_ship_range_engine_1:60, medium_ship_range_engine_2:60, medium_ship_range_engine_3:60, medium_ship_range_engine_4:60, medium_ship_perf_engine_1:90, medium_ship_perf_engine_2:90, medium_ship_perf_engine_3:90, medium_ship_perf_engine_4:90,
      heavy_ship_deprecated_engine:120, heavy_ship_range_engine_1:80, heavy_ship_range_engine_2:80, heavy_ship_range_engine_3:80, heavy_ship_range_engine_4:80, heavy_ship_perf_engine_1:120, heavy_ship_perf_engine_2:120, heavy_ship_perf_engine_3:120, heavy_ship_perf_engine_4:120,
      sub_ship_deprecated_engine:10, sub_ship_engine_1:10, sub_ship_engine_2:10, sub_ship_engine_3:10, sub_ship_engine_4:10,
      ship_torpedo_1:10, ship_torpedo_2:10,
      ship_torpedo_sub_1:10, ship_torpedo_sub_2:10,
      ship_mine_layer:20,
      ship_mine_layer_sub:10,
      ship_mine_sweeper:10,
      ship_depth_charge_1:10, ship_depth_charge_2:10, ship_depth_charge_3:10, ship_depth_charge_4:10,
      ship_airplane_launcher:10,
      ship_deck_space:50, ship_large_deck_space:150,
      ship_sonar_1:10, ship_sonar_2:10, ship_sonar_3:10, ship_sonar_4:10,
      ship_fire_control_system_1:10, ship_fire_control_system_2:10, ship_fire_control_system_3:10, ship_fire_control_system_4:10,
      ship_surveillance_radar_1:10, ship_surveillance_radar_2:10, ship_surveillance_radar_3:10, ship_surveillance_radar_4:10,
      ship_fire_control_radar_1:10, ship_fire_control_radar_2:10,
      ship_unarmored_hangar:100},
    carrier_size : {ship_deck_space:10, ship_large_deck_space:40},
    lg_attack : {ship_light_battery_1:2, ship_light_battery_2:3, ship_light_battery_3:3, ship_light_battery_4:4, 
      ship_light_medium_battery_1:8, ship_light_medium_battery_2:10, ship_light_medium_battery_3:12, ship_light_medium_battery_4:14},
    lg_armor_piercing : {},
    hg_attack : {ship_heavy_medium_battery_1:8, ship_heavy_medium_battery_2:10, ship_heavy_medium_battery_3:12, ship_heavy_medium_battery_4:14, 
      ship_heavy_battery_1:16, ship_heavy_battery_2:20, ship_heavy_battery_3:24, ship_heavy_battery_4:28},
    hg_armor_piercing : {},
    torpedo_attack : {ship_torpedo_1:30, ship_torpedo_2:40,
      ship_torpedo_sub_1:10, ship_torpedo_sub_2:14},
    sub_attack : {ship_depth_charge_1:10, ship_depth_charge_2:15, ship_depth_charge_3:20, ship_depth_charge_4:25},
    armor_value : {ship_light_armor:3,
      ship_medium_armor_1:6, ship_medium_armor_2:8, ship_medium_armor_3:10, ship_medium_armor_4:12,
      ship_heavy_armor_1:12, ship_heavy_armor_2:16, ship_heavy_armor_3:20, ship_heavy_armor_4:24},
    anti_air_attack : {ship_light_battery_3:2, ship_light_battery_4:3,
      ship_anti_air_1:1, ship_anti_air_2:2, ship_anti_air_3:3, ship_anti_air_4:4},
    fuel_consumption : {light_ship_deprecated_engine:6, light_ship_range_engine_1:6, light_ship_range_engine_2:7, light_ship_range_engine_3:8, light_ship_range_engine_4:9, light_ship_perf_engine_1:8, light_ship_perf_engine_2:9, light_ship_perf_engine_3:10, light_ship_perf_engine_4:11,
      medium_ship_deprecated_engine:18, medium_ship_range_engine_1:18, medium_ship_range_engine_2:21, medium_ship_range_engine_3:24, medium_ship_range_engine_4:27, medium_ship_perf_engine_1:24, medium_ship_perf_engine_2:27, medium_ship_perf_engine_3:30, medium_ship_perf_engine_4:33,
      heavy_ship_deprecated_engine:54, heavy_ship_range_engine_1:54, heavy_ship_range_engine_2:63, heavy_ship_range_engine_3:72, heavy_ship_range_engine_4:81, heavy_ship_perf_engine_1:72, heavy_ship_perf_engine_2:81, heavy_ship_perf_engine_3:90, heavy_ship_perf_engine_4:99,
      sub_ship_deprecated_engine:3, sub_ship_engine_1:2, sub_ship_engine_2:3, sub_ship_engine_3:4, sub_ship_engine_4:5},
    surface_visibility : {ship_light_battery_1:0.5, ship_light_battery_2:0.5, ship_light_battery_3:0.5, ship_light_battery_4:0.5,
      ship_light_medium_battery_1:1, ship_light_medium_battery_2:1, ship_light_medium_battery_3:1, ship_light_medium_battery_4:1,
      ship_heavy_medium_battery_1:1, ship_heavy_medium_battery_2:1, ship_heavy_medium_battery_3:1, ship_heavy_medium_battery_4:1,
      ship_heavy_battery_1:2, ship_heavy_battery_2:2, ship_heavy_battery_3:2, ship_heavy_battery_4:2,
      ship_torpedo_1:0.5, ship_torpedo_2:0.5,
      ship_airplane_launcher:0.5,
      ship_deck_space:1, ship_large_deck_space:2},
    surface_detection : {ship_airplane_launcher:5},
    sub_visibility : {ship_torpedo_sub_1:1.5, ship_torpedo_sub_2:2,
      ship_mine_layer_sub:2},
    sub_detection : {ship_airplane_launcher:5,
      ship_sonar_1:6, ship_sonar_2:12, ship_sonar_3:18, ship_sonar_4:24},
    mines_planting : {ship_mine_layer:1,
      ship_mine_layer_sub:0.5},
    mines_sweeping : {ship_mine_sweeper:1},
    build_cost_ic : {ship_light_battery_1:50, ship_light_battery_2:100, ship_light_battery_3:150, ship_light_battery_4:200,
      ship_light_medium_battery_1:200, ship_light_medium_battery_2:300, ship_light_medium_battery_3:400, ship_light_medium_battery_4:500,
      ship_heavy_medium_battery_1:200, ship_heavy_medium_battery_2:300, ship_heavy_medium_battery_3:400, ship_heavy_medium_battery_4:500,
      ship_heavy_battery_1:400, ship_heavy_battery_2:600, ship_heavy_battery_3:800, ship_heavy_battery_4:1000, 
      ship_anti_air_1:30, ship_anti_air_2:60, ship_anti_air_3:90, ship_anti_air_4:120,
      light_ship_deprecated_engine:200, light_ship_range_engine_1:200, light_ship_range_engine_2:300, light_ship_range_engine_3:400, light_ship_range_engine_4:500, light_ship_perf_engine_1:300, light_ship_perf_engine_2:400, light_ship_perf_engine_3:500, light_ship_perf_engine_4:600,
      medium_ship_deprecated_engine:600, medium_ship_range_engine_1:600, medium_ship_range_engine_2:800, medium_ship_range_engine_3:1000, medium_ship_range_engine_4:1200, medium_ship_perf_engine_1:800, medium_ship_perf_engine_2:1000, medium_ship_perf_engine_3:1200, medium_ship_perf_engine_4:1400,
      heavy_ship_deprecated_engine:1400, heavy_ship_range_engine_1:1400, heavy_ship_range_engine_2:1700, heavy_ship_range_engine_3:2000, heavy_ship_range_engine_4:2300, heavy_ship_perf_engine_1:1700, heavy_ship_perf_engine_2:2000, heavy_ship_perf_engine_3:2300, heavy_ship_perf_engine_4:2600,
      sub_ship_deprecated_engine:60, sub_ship_engine_1:70, sub_ship_engine_2:80, sub_ship_engine_3:90, sub_ship_engine_4:100,
      ship_torpedo_1:100, ship_torpedo_2:150,
      ship_torpedo_sub_1:70, ship_torpedo_sub_2:100,
      ship_mine_layer:90,
      ship_mine_layer_sub:100,
      ship_mine_sweeper:30,
      ship_depth_charge_1:50, ship_depth_charge_2:110, ship_depth_charge_3:180, ship_depth_charge_4:260,
      ship_sub_snorkel_1:50, ship_sub_snorkel_2:110,
      ship_airplane_launcher:150,
      ship_deck_space:250, ship_large_deck_space:900,
      ship_sonar_1:20, ship_sonar_2:50, ship_sonar_3:105, ship_sonar_4:150,
      ship_fire_control_system_1:40, ship_fire_control_system_2:100, ship_fire_control_system_3:210, ship_fire_control_system_4:300,
      ship_surveillance_radar_1:40, ship_surveillance_radar_2:100, ship_surveillance_radar_3:210, ship_surveillance_radar_4:300,
      ship_fire_control_radar_1:150, ship_fire_control_radar_2:400},
    steel : {ship_light_medium_battery_1:1, ship_light_medium_battery_2:1, ship_light_medium_battery_3:1, ship_light_medium_battery_4:1,
      ship_heavy_medium_battery_1:1, ship_heavy_medium_battery_2:1, ship_heavy_medium_battery_3:1, ship_heavy_medium_battery_4:1,
      ship_heavy_battery_1:1, ship_heavy_battery_2:1, ship_heavy_battery_3:1, ship_heavy_battery_4:1,
      reinforced_structure:1,
      ship_deck_space:1, ship_large_deck_space:1},
    chromium : {ship_medium_armor_1:1, ship_medium_armor_2:1, ship_medium_armor_3:1, ship_medium_armor_4:1,
      ship_heavy_armor_1:1, ship_heavy_armor_2:1, ship_heavy_armor_3:1, ship_heavy_armor_4:1}
  }

  //Stat Average per equipment piece
  avg = {
    naval_speed : {},
    naval_range : {},
    max_organisation : {},
    max_strength : {},
    reliability : {},
    supply_consumption : {},
    manpower : {},
    carrier_size : {},
    lg_attack : {},
    lg_armor_piercing : {ship_light_battery_1:1, ship_light_battery_2:4, ship_light_battery_3:2, ship_light_battery_4:4,
      ship_light_medium_battery_1:4, ship_light_medium_battery_2:6, ship_light_medium_battery_3:8, ship_light_medium_battery_4:10},
    hg_attack : {},
    hg_armor_piercing : {ship_heavy_medium_battery_1:8, ship_heavy_medium_battery_2:12, ship_heavy_medium_battery_3:16, ship_heavy_medium_battery_4:20, 
      ship_heavy_battery_1:16, ship_heavy_battery_2:24, ship_heavy_battery_3:32, ship_heavy_battery_4:40},
    torpedo_attack : {},
    sub_attack : {},
    armor_value : {},
    anti_air_attack : {},
    fuel_consumption : {},
    surface_visibility : {},
    surface_detection : {},
    sub_visibility : {},
    sub_detection : {},
    mines_planting : {},
    mines_sweeping : {},
    build_cost_ic : {},
    steel : {},
    chromium : {}
  }

  //Stat Percentage per equipment piece
  per = {
    naval_speed : {ship_light_battery_1:-0.005, ship_light_battery_2:-0.01, ship_light_battery_3:-0.015, ship_light_battery_4:-0.02,
      ship_light_medium_battery_1:-0.02, ship_light_medium_battery_2:-0.03, ship_light_medium_battery_3:-0.04, ship_light_medium_battery_4:-0.05,
      ship_heavy_medium_battery_1:-0.02, ship_heavy_medium_battery_2:-0.03, ship_heavy_medium_battery_3:-0.04, ship_heavy_medium_battery_4:-0.05,
      ship_heavy_battery_1:-0.04, ship_heavy_battery_2:-0.05, ship_heavy_battery_3:-0.06, ship_heavy_battery_4:-0.07,
      ship_light_armor:-0.02,
      ship_medium_armor_1:-0.03, ship_medium_armor_2:-0.04, ship_medium_armor_3:-0.05, ship_medium_armor_4:-0.06,
      ship_heavy_armor_1:-0.06, ship_heavy_armor_2:-0.08, ship_heavy_armor_3:-0.1, ship_heavy_armor_4:-0.12,
      ship_anti_air_1:-0.005, ship_anti_air_2:-0.01, ship_anti_air_3:-0.015, ship_anti_air_4:-0.02,
      ship_torpedo_1:-0.02, ship_torpedo_2:-0.03,
      ship_torpedo_sub_1:-0.02, ship_torpedo_sub_2:-0.02,
      ship_mine_layer:-0.02,
      ship_mine_layer_sub:-0.02,
      ship_depth_charge_1:-0.01, ship_depth_charge_2:-0.01, ship_depth_charge_3:-0.01, ship_depth_charge_4:-0.01,
      ship_airplane_launcher:-0.01,
      ship_deck_space:-0.05, ship_large_deck_space:-0.07,
      mediterranean_naval_manufacturer:{CV:0.1, BB:0.1, CVL:0.1, CA:0.1, CL:0.1, DD:0.1, SS:0.1}},
    naval_range : {ship_unavailable_space:-0.1,
      light_ship_deprecated_engine:-0.1, light_ship_range_engine_1:0.05, light_ship_range_engine_2:0.1, light_ship_range_engine_3:0.15, light_ship_range_engine_4:0.2, light_ship_perf_engine_2:-0.05, light_ship_perf_engine_3:-0.1, light_ship_perf_engine_4:-0.15,
      medium_ship_deprecated_engine:-0.1, medium_ship_range_engine_1:0.05, medium_ship_range_engine_2:0.1, medium_ship_range_engine_3:0.15, medium_ship_range_engine_4:0.5, medium_ship_perf_engine_2:-0.05, medium_ship_perf_engine_3:-0.1, medium_ship_perf_engine_4:-0.15,
      heavy_ship_deprecated_engine:-0.1, heavy_ship_range_engine_1:0.05, heavy_ship_range_engine_2:0.1, heavy_ship_range_engine_3:0.15, heavy_ship_range_engine_4:0.2, heavy_ship_perf_engine_2:-0.05, heavy_ship_perf_engine_3:-0.1, heavy_ship_perf_engine_4:-0.15,
      sub_ship_deprecated_engine:-0.1, sub_ship_engine_2:0.05, sub_ship_engine_3:0.1, sub_ship_engine_4:0.15,
      ship_extra_fuel_tank:0.3,
      pacific_fleet_naval_manufacturer:{CV:0.2, BB:0.2, CVL:0.2, CA:0.2, CL:0.2, DD:0.2, SS:0.2},
      coastal_defence_naval_manufacturer:{CV:-0.2, BB:-0.2, CVL:-0.2, CA:-0.2, CL:-0.2, DD:-0.2, SS:-0.2}},
    max_organisation : {},
    max_strength : {ship_unavailable_space:-0.1,
      reinforced_structure:0.2,
      ship_unarmored_hangar:-0.2,
      ship_extra_fuel_tank:0.05,
      atlantic_fleet_naval_manufacturer:{CV:0.1, BB:0.1, CVL:0.1, CA:0.1, CL:0.1, DD:0.1, SS:0.1},
      battlefleet_designer:{CV:0.1, BB:0.1, CVL:0.1, CA:0.1, CL:0.1, DD:0.1, SS:0.1}},
    reliability : {damage_control_system_1:0.1, damage_control_system_2:0.2, damage_control_system_3:0.3},
    manpower : {},
    carrier_size : {ship_unarmored_hangar:0.1},
    lg_attack : {ship_fire_control_system_1:0.05, ship_fire_control_system_2:0.1, ship_fire_control_system_3:0.15, ship_fire_control_system_4:0.2,
      ship_fire_control_radar_1:0.1, ship_fire_control_radar_2:0.2,
      battlefleet_designer:{CV:0.1, BB:0.1, CVL:0.1, CA:0.1, CL:0.1, DD:0.1, SS:0.1},
      coastal_defence_naval_manufacturer:{CV:0.1, BB:0.1, CVL:0.1, CA:0.1, CL:0.1, DD:0.1, SS:0.1},
      Light_shell_1:{CV:0.05, BB:0.05, CVL:0.05, CA:0.05, CL:0.05, DD:0.05},
      Light_shell_2:{CV:0.05, BB:0.05, CVL:0.05, CA:0.05, CL:0.05, DD:0.05},
      Light_shell_3:{CV:0.05, BB:0.05, CVL:0.05, CA:0.05, CL:0.05, DD:0.05}},
    lg_armor_piercing : {},
    hg_attack : {ship_fire_control_system_1:0.05, ship_fire_control_system_2:0.1, ship_fire_control_system_3:0.15, ship_fire_control_system_4:0.2,
      ship_fire_control_radar_1:0.1, ship_fire_control_radar_2:0.2,
      battlefleet_designer:{CV:0.1, BB:0.1, CVL:0.1, CA:0.1, CL:0.1, DD:0.1, SS:0.1},
      coastal_defence_naval_manufacturer:{CV:0.1, BB:0.1, CVL:0.1, CA:0.1, CL:0.1, DD:0.1, SS:0.1},
      Heavy_shell_1:{BB:0.05, CA:0.05},
      Heavy_shell_2:{BB:0.05, CA:0.05},
      Heavy_shell_3:{BB:0.05, CA:0.05}},
    hg_armor_piercing : {},
    torpedo_attack : {ship_fire_control_system_1:0.05, ship_fire_control_system_2:0.1, ship_fire_control_system_3:0.15, ship_fire_control_system_4:0.2,
      Torpedo_1:{CA:0.3, CL:0.3, DD:0.3, SS:0.3},
      Torpedo_2:{CA:0.3, CL:0.3, DD:0.3, SS:0.3},
      Torpedo_3:{CA:0.3, CL:0.3, DD:0.3, SS:0.3}},
    sub_attack : {},
    armor_value : {},
    anti_air_attack : {ship_anti_air_1:0.1, ship_anti_air_2:0.15, ship_anti_air_3:0.2, ship_anti_air_4:0.25,
      ship_fire_control_system_2:0.1, ship_fire_control_system_3:0.15, ship_fire_control_system_4:0.2,
      ship_fire_control_radar_1:0.1, ship_fire_control_radar_2:0.2},
    fuel_consumption : {},
    surface_visibility : {ship_unavailable_space:-0.05,
      ship_sub_snorkel_1:1, ship_sub_snorkel_2:1,
      ship_extra_fuel_tank:0.1,
      convoy_escort_naval_manufacturer:{CV:-0.1, BB:-0.1, CVL:-0.1, CA:-0.1, CL:-0.1, DD:-0.1, SS:-0.1}},
    surface_detection : {ship_surveillance_radar_1:0.25, ship_surveillance_radar_2:0.5, ship_surveillance_radar_3:0.75, ship_surveillance_radar_4:1,
      raiding_fleet_naval_manufacturer:{CV:0.2, BB:0.2, CVL:0.2, CA:0.2, CL:0.2, DD:0.2, SS:0.2}},
    sub_visibility : {ship_unavailable_space:-0.05,
      sub_ship_engine_1:-0.05, sub_ship_engine_2:-0.1, sub_ship_engine_3:-0.15, sub_ship_engine_4:-0.2,
      ship_sub_snorkel_1:-0.1, ship_sub_snorkel_2:-0.2,
      ship_extra_fuel_tank:0.05,
      raiding_fleet_naval_manufacturer:{CV:-0.1, BB:-0.1, CVL:-0.1, CA:-0.1, CL:-0.1, DD:-0.1, SS:-0.1}},
    sub_detection : {convoy_escort_naval_manufacturer:{CV:0.2, BB:0.2, CVL:0.2, CA:0.2, CL:0.2, DD:0.2, SS:0.2}},
    mines_planting : {Mines_1:{SS:0.5}},
    mines_sweeping : {},
    build_cost_ic : {ship_light_armor:0.05,
      ship_medium_armor_1:0.09, ship_medium_armor_2:0.12, ship_medium_armor_3:0.15, ship_medium_armor_4:0.18,
      ship_heavy_armor_1:0.18, ship_heavy_armor_2:0.24, ship_heavy_armor_3:0.3, ship_heavy_armor_4:0.36,
      ship_anti_air_1:0.01, ship_anti_air_2:0.02, ship_anti_air_3:0.03, ship_anti_air_4:0.04,
      ship_unavailable_space:-0.1,
      damage_control_system_1:0.05, damage_control_system_2:0.1, damage_control_system_3:0.15,
      reinforced_structure:0.1,
      ship_unarmored_hangar:0.1,
      ship_extra_fuel_tank:0.2},
    steel : {},
    chromium : {}
  }
  

  /* 
  End of variable definition. Start of the constructor 
  */

  constructor() {
    super();
  }

/*Called Functions*/

  // Test function for any call by html objects
  func() {
    alert("clicked")
  }

  // Test function to log the value of a select object
  func1() {
    var d = document.getElementById("hullselect").value
    console.log(d)
  }

  // Swapper is called by the Swap Hull button and reloads the html elements corresponding to the hull currently selected in hullselect. Swapper does NOT reload the page
  swapper(){
    console.log(this.set)
    this.set = document.getElementById("hullselect").value
    render(<App />, document.getElementById('root'));
  }

  // ClassCheck returns a string of two characters that correspond to the class of the vessel
  ClassChecker(scop){

    var equ = {}
    var slotid = ""
    var s = "";
    for(var i = 1; i < 15; i++){
      slotid = "slot".concat(i.toString());
      s = document.getElementById(slotid).value
      if(Object.keys(equ).indexOf(s)!=-1){
        equ[s] = equ[s] + 1;
      } else {
        equ[s] = 1;
      }
    }

    if(scop.set == 0){
      return("DD")
    }
    else if(scop.set == 1){
      return("CL")
    }
    else if(scop.set == 2){
      return("CA")
    }
    else if(scop.set == 3){
      return("CV")
    }
    else if(scop.set == 4){
      return("BB")
    }
    else if(scop.set == 5){
      return("CV")
    }
    else{
      return("SS")
    }
  }

  decimalCutToThree(num){
    num = num + 0.00001
    var hasdec = false;
    var str = num.toString()
    for(var i = 0 ; i<str.length; i++){
      if(str.charAt(i) == '.'){
        hasdec = true;
      }
      if(str.charAt(i) == '.' && str.length-1-i>2){
        return(str.substring(0,i+3))
      }
    }
    if (hasdec){
      return (str)
    }
    return (str + ".00")
  }
  decimalCutToTwo(num){
    num = num + 0.00001
    var hasdec = false;
    var str = num.toString()
    for(var i = 0 ; i<str.length; i++){
      if(str.charAt(i) == '.'){
        hasdec = true;
      }
      if(str.charAt(i) == '.' && str.length-1-i>1){
        return(str.substring(0,i+2))
      }
    }
    if (hasdec){
      return (str)
    }
    return (str + ".0")
  }
  decimalCutToNone(num){
    num = num + 0.00001
    var str = num.toString()
    for(var i = 0 ; i<str.length; i++){
      if(str.charAt(i) == '.'){
        return(str.substring(0,i))
      }
    }
    return (str)
  }
  decimalCutToPercentage(num){
    num = num + 0.00001
    var hasdec = false;
    var str = (num*100).toString()
    for(var i = 0 ; i<str.length; i++){
      if(str.charAt(i) == '.'){
        hasdec = true;
      }
      if(str.charAt(i) == '.' && str.length-1-i>1){
        return(str.substring(0,i+2)+" %")
      }
    }
    if (hasdec){
      return (str+" %")
    }
    return (str+".0 %")
  }
  decimalCutToKn(num){
    num = num + 0.00001
    var hasdec = false;
    var str = num.toString()
    for(var i = 0 ; i<str.length; i++){
      if(str.charAt(i) == '.'){
        hasdec = true;
      }
      if(str.charAt(i) == '.' && str.length-1-i>1){
        return(str.substring(0,i+2)+" kn")
      }
    }
    if (hasdec){
      return (str+" kn")
    }
    return (str+".0 kn")
  }
  decimalCutToKm(num){
    num = num + 0.00001
    var str = num.toString()
    for(var i = 0 ; i<str.length; i++){
      if(str.charAt(i) == '.'){
        return(str.substring(0,i)+" km")
      }
    }
    return (str+" km")
  }


  // Refresh recalculates the stats. It may be called at any point and should be called immediately after each change, ideally, but can also be called manually
  refresh(funcCla, scop, funcKm, funcKn, funcNo, funcPe, funcTh, funcTw){


    // Pull out the base stats of the currently selected Hull

    var finalstat = {};

    finalstat["naval_speed"] = scop.naval_speed[scop.set];
    finalstat["naval_range"] = scop.naval_range[scop.set];
    finalstat["max_organisation"] = scop.max_organisation[scop.set];
    finalstat["max_strength"] = scop.max_strength[scop.set];
    finalstat["reliability"] = scop.reliability[scop.set];
    finalstat["supply_consumption"] = scop.supply_consumption[scop.set];
    finalstat["manpower"] = scop.manpower[scop.set];
    finalstat["carrier_size"] = scop.carrier_size[scop.set];
    finalstat["lg_attack"] = scop.lg_attack[scop.set];
    finalstat["lg_armor_piercing"] = scop.lg_armor_piercing[scop.set];
    finalstat["hg_attack"] = scop.hg_attack[scop.set];
    finalstat["hg_armor_piercing"] = scop.hg_armor_piercing[scop.set];
    finalstat["torpedo_attack"] = scop.torpedo_attack[scop.set];
    finalstat["sub_attack"] = scop.sub_attack[scop.set];
    finalstat["armor_value"] = scop.armor_value[scop.set];
    finalstat["anti_air_attack"] = scop.anti_air_attack[scop.set];
    finalstat["fuel_consumption"] = scop.fuel_consumption[scop.set];
    finalstat["surface_visibility"] = scop.surface_visibility[scop.set];
    finalstat["surface_detection"] = scop.surface_detection[scop.set];
    finalstat["sub_visibility"] = scop.sub_visibility[scop.set];
    finalstat["sub_detection"] = scop.sub_detection[scop.set];
    finalstat["mines_planting"] = scop.mines_planting[scop.set];
    finalstat["mines_sweeping"] = scop.mines_sweeping[scop.set];
    finalstat["build_cost_ic"] = scop.build_cost_ic[scop.set];
    finalstat["steel"] = scop.steel[scop.set];
    finalstat["chromium"] = scop.chromium[scop.set];

    // Gather the mounted equipment and count them in a dictionary of which a key is an equipment id and the associated value is the number of times it is mounted

    var equ = {}
    var slotid = ""
    var s = "";
    for(var i = 1; i < 15; i++){
      slotid = "slot".concat(i.toString());
      s = document.getElementById(slotid).value
      if(Object.keys(equ).indexOf(s)!=-1){
        equ[s] = equ[s] + 1;
      } else {
        equ[s] = 1;
      }
    }

    var cla = funcCla(scop);
    var des = document.getElementById("desi").value
    var doc = document.getElementById("doct").value

    var tec = []

    for(var k = 0; k<scop.tech_table.length; k++){
      if(document.getElementById(scop.tech_table[k]).checked){
        tec.push(document.getElementById(scop.tech_table[k]).value)
      }
    }

    // Search the add table for equipment ids present in equ and modifies the stats accordingly. Also handles designers, doctrines and techs

    //iterates on all the keys of add ; that is, each existing stat
    for(var statid of Object.keys(scop.add)){
      var line = scop.add[statid]

      //iterates on all the keys of equ ; that is, each mounted equipment piece
      for(var equid of Object.keys(equ)){

        //checks to see if the current equipment piece modifies the currenty examined stat
        if(Object.keys(line).indexOf(equid) != -1){

          var mod = line[equid];

          //apply the stat change as many times as the equipment piece is mounted on the hull
          for(var i = 0; i < equ[equid]; i++){
            finalstat[statid] = finalstat[statid] + mod;
          }
        }
      }

      //checks to see if the current designer piece modifies the currenty examined stat
      if(Object.keys(line).indexOf(des) != -1){

        var mod = line[des];

        //Check the relevant modifier for the class of the concerned vessel, and applies it, if any
        if(Object.keys(mod).indexOf(cla) != -1){
          finalstat[statid] = finalstat[statid] + mod[cla];
        }
      }

      //checks to see if the current doctrine piece modifies the currenty examined stat
      if(Object.keys(line).indexOf(doc) != -1){

        var mod = line[doc];

        //Check the relevant modifier for the class of the concerned vessel, and applies it, if any
        if(Object.keys(mod).indexOf(cla) != -1){
          finalstat[statid] = finalstat[statid] + mod[cla];
        }
      }

      // add of technologies
      for(var tec_check of tec){
        if(Object.keys(line).indexOf(tec_check) != -1){

          var mod = line[tec_check];

          //Check the relevant modifier for the class of the concerned vessel, and applies it, if any
          if(Object.keys(mod).indexOf(cla) != -1){
            finalstat[statid] = finalstat[statid] + mod[cla];
          }
        }
      }
    }

    // Search the avg table for equipment ids present in equ and modifies the stats accordingly

    //iterates on all the keys of avg ; that is, each existing stat
    for(var statid of Object.keys(scop.avg)){
      var line = scop.avg[statid]

      //Create a temporary table to remember the values that will later be averaged
      var tempavgstat = [];

      //iterates on all the keys of equ ; that is, each mounted equipment piece
      for(var equid of Object.keys(equ)){

        //checks to see if the current equipment piece modifies the currenty examined stat
        if(Object.keys(line).indexOf(equid) != -1){

          var mod = line[equid];

          //Remember the stat change as many times as the equipment piece is mounted on the hull
          for(var i = 0; i < equ[equid]; i++){
            tempavgstat.push(mod);
          }
        }
      }

      //Averages all the remembered stat change and saves the new value in finalstat
      if(tempavgstat.length!=0){
        var finalValue = 0;
        for(var j = 0; j < tempavgstat.length; j++){
          finalValue = finalValue + tempavgstat[j];
        }
        finalValue = finalValue / tempavgstat.length
        finalstat[statid] = finalstat[statid] + finalValue
      }
    }

    // Search the per table for equipment ids present in equ and modifies the stats accordingly. also handles designers

    //iterates on all the keys of per ; that is, each existing stat
    for(var statid of Object.keys(scop.per)){
      var line = scop.per[statid]
      var rememberedValue = finalstat[statid];

      //iterates on all the keys of equ ; that is, each mounted equipment piece
      for(var equid of Object.keys(equ)){

        //checks to see if the current equipment piece modifies the currenty examined stat
        if(Object.keys(line).indexOf(equid) != -1){

          var mod = line[equid]*rememberedValue;

          //apply the stat change as many times as the equipment piece is mounted on the hull
          for(var i = 0; i < equ[equid]; i++){
            finalstat[statid] = finalstat[statid] + mod;
          }
        }
      }

      //checks to see if the current designer piece modifies the currenty examined stat
      if(Object.keys(line).indexOf(des) != -1){

        var mod = line[des];

        //Check the relevant modifier for the class of the concerned vessel, and applies it, if any
        if(Object.keys(mod).indexOf(cla) != -1){
          finalstat[statid] = finalstat[statid] + (mod[cla]*rememberedValue);
        }
      }
    }

    // Search through per again to apply technology, doctrine effect if applicable

    //iterates on all the keys of per ; that is, each existing stat
    for(var statid of Object.keys(scop.per)){
      var line = scop.per[statid]
      var rememberedValue = finalstat[statid];

      //checks to see if the current doctrine piece modifies the currenty examined stat
      if(Object.keys(line).indexOf(doc) != -1){
    

        var mod = line[doc];

        //Check the relevant modifier for the class of the concerned vessel, and applies it, if any
        if(Object.keys(mod).indexOf(cla) != -1){
          finalstat[statid] = finalstat[statid] + (mod[cla]*rememberedValue);
        }
      }

      for(var tec_check of tec){
        if(Object.keys(line).indexOf(tec_check) != -1){

          var mod = line[tec_check];

          //Check the relevant modifier for the class of the concerned vessel, and applies it, if any
          if(Object.keys(mod).indexOf(cla) != -1){
            finalstat[statid] = finalstat[statid] + (mod[cla]*rememberedValue);
          }
        }
      }
    }

    // Writes all the values into the html for the user to see

    document.getElementById('naval_speed').innerHTML = funcKn(finalstat["naval_speed"]);
    document.getElementById('naval_range').innerHTML = funcKm(finalstat["naval_range"]);
    document.getElementById('max_organisation').innerHTML = funcTw(finalstat["max_organisation"]);
    document.getElementById('max_strength').innerHTML = funcTw(finalstat["max_strength"]);
    document.getElementById('reliability').innerHTML = funcPe(finalstat["reliability"]);
    document.getElementById('supply_consumption').innerHTML = funcTh(finalstat["supply_consumption"]);
    document.getElementById('manpower').innerHTML = funcNo(finalstat["manpower"]);
    document.getElementById('carrier_size').innerHTML = funcNo(finalstat["carrier_size"]);
    document.getElementById('lg_attack').innerHTML = funcTw(finalstat["lg_attack"]);
    document.getElementById('lg_armor_piercing').innerHTML = funcTw(finalstat["lg_armor_piercing"]);
    document.getElementById('hg_attack').innerHTML = funcTw(finalstat["hg_attack"]);
    document.getElementById('hg_armor_piercing').innerHTML = funcTw(finalstat["hg_armor_piercing"]);
    document.getElementById('torpedo_attack').innerHTML = funcTw(finalstat["torpedo_attack"]);
    document.getElementById('sub_attack').innerHTML = funcTw(finalstat["sub_attack"]);
    document.getElementById('armor_value').innerHTML = funcTw(finalstat["armor_value"]);
    document.getElementById('anti_air_attack').innerHTML = funcTw(finalstat["anti_air_attack"]);
    document.getElementById('fuel_consumption').innerHTML = funcTw(finalstat["fuel_consumption"]);
    document.getElementById('surface_visibility').innerHTML = funcTw(finalstat["surface_visibility"]);
    document.getElementById('surface_detection').innerHTML = funcTw(finalstat["surface_detection"]);
    document.getElementById('sub_visibility').innerHTML = funcTw(finalstat["sub_visibility"]);
    document.getElementById('sub_detection').innerHTML = funcTw(finalstat["sub_detection"]);
    document.getElementById('mines_planting').innerHTML = funcTh(finalstat["mines_planting"]);
    document.getElementById('mines_sweeping').innerHTML = funcTh(finalstat["mines_sweeping"]);
    document.getElementById('build_cost_ic').innerHTML = funcNo(finalstat["build_cost_ic"]);
    document.getElementById('steel').innerHTML = funcNo(finalstat["steel"]);
    document.getElementById('chromium').innerHTML = funcNo(finalstat["chromium"]);

  }

  intervalsetter(){
    var scop = this
    setInterval(this.refresh, 1000, this.ClassChecker, scop, this.decimalCutToKm, this.decimalCutToKn, this.decimalCutToNone, this.decimalCutToPercentage, this.decimalCutToThree, this.decimalCutToTwo)
  }

  reactElementCopy(rea){
    var newrea = {}

    for(var elt of Object.keys(rea)){

      if(elt == "props" && Object.keys(rea["props"]).length != 0 && Object.keys(rea["props"]).indexOf("children")!=-1){
        newrea["props"] = {}

        if(rea["props"]["children"].length == undefined){
          newrea["props"]["children"] = this.reactElementCopy(rea["props"]["children"])
        } else if(typeof rea["props"]["children"] == "string"){
          newrea["props"]["children"] = rea["props"]["children"]
        } else{
          newrea["props"]["children"] = []

          for(var i=0; i<rea["props"]["children"].length; i++){
            var chi = rea["props"]["children"][i]

            if(typeof chi == "string"){
              newrea["props"]["children"].push(chi)
            } else {
              newrea["props"]["children"].push(this.reactElementCopy(chi))
            }
          }
        }

        for(var propelt of Object.keys(rea["props"])){
          if(propelt!="children"){
            newrea["props"][propelt] = rea["props"][propelt]
          }
        }

      } else{
        if(elt == "props"){
          var newprops = {}
          for(var propelt of Object.keys(rea[elt])){
            newprops[propelt] = rea[elt][propelt]
          }
          newrea[elt] = newprops
        } else{
          newrea[elt] = rea[elt]
        }
      }
    }
    return (newrea)
  }

  copytoclip(){
    var ret = window.location.origin + "/?"
    ret = ret + "hull=" + document.getElementById("hullselect").value
    for(var i=1 ; i<15 ; i++){
      if(document.getElementById("slot" + i).value!="Empty" && document.getElementById("slot" + i).value!="Locked"){
        ret = ret + "&s" + i + "=" + document.getElementById("slot" + i).selectedIndex
      }
    }
     ret = ret + "&de=" + document.getElementById("desi").selectedIndex
     ret = ret + "&do=" + document.getElementById("doct").selectedIndex

     if(document.getElementById("magnetic_fuze").checked == true){
       ret = ret + "&mf=1"
     }
     if(document.getElementById("acoustic_torpedo").checked == true){
       ret = ret + "&at=1"
     }
     if(document.getElementById("torpex").checked == true){
       ret = ret + "&to=1"
     }

     if(document.getElementById("improved_submarine_mine_laying").checked == true){
       ret = ret + "&isml=1"
     }

     if(document.getElementById("basic_light_shell").checked == true){
       ret = ret + "&bls=1"
     }
     if(document.getElementById("improved_light_shell").checked == true){
       ret = ret + "&ils=1"
     }
     if(document.getElementById("advanced_light_shell").checked == true){
       ret = ret + "&als=1"
     }

     if(document.getElementById("basic_heavy_shell").checked == true){
       ret = ret + "&bhs=1"
     }
     if(document.getElementById("improved_heavy_shell").checked == true){
       ret = ret + "&ihs=1"
     }
     if(document.getElementById("advanced_heavy_shell").checked == true){
       ret = ret + "&ahs=1"
     }

    document.querySelector("#inputcopy").value = ret
    var copyText = document.querySelector("#inputcopy");
    copyText.select();
    var textarea = document.createElement('textarea');
    textarea.textContent = ret;
    document.body.appendChild(textarea);

    var selection = document.getSelection();
    var range = document.createRange();
    
    range.selectNode(textarea);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("copy");

    document.body.removeChild(textarea);

    console.log(ret)
  }

  // Default render function that returns the html of the page. This function should NEVER BE CALLED ; to reload the page according to its return value, use: render(<App />, document.getElementById('root'))
  render() {

    console.log(window.location.origin + "/")

    var emptydiv = 
      <div>
      </div>
    ;

    //console.log(this)

    var a =
      <div>
        <div class="title">
          <br/>
          <p id="title1">Naval calculator</p>
          <p id="title2">Hearts of Iron IV 1.9.3</p>
          <br/>
        </div>
        <br/>
        <br/>
        <div class="hull">
          <select onChange={() => this.swapper()} id="hullselect">
            <option value="0">DD Hull</option>
            <option class="grey" value="1">CL Hull</option>
            <option value="2">CA Hull</option>
            <option class="grey" value="3">CVL Hull</option>
            <option value="4">BB Hull</option>
            <option class="grey" value="5">CV Hull</option>
            <option value="6">SS Hull</option>
          </select>
        </div>
        <br/>
        <br/>
      </div>
    ;

    var acopy = this.reactElementCopy(a)

    var b =
      <div class="center">
        <br/>
        <br/>
        <table>
          <tbody>
            <tr>
              <td>
                <table id="techno">
                  <tbody>
                    <tr>
                      <td class="techno_cell">
                        <p class="tech_names">
                          <label class="bold">Designer</label><br/>
                          <select id="desi">
                            <option value="No_Designer">No designer</option>
                            <option value="atlantic_fleet_naval_manufacturer">Atlantic fleet designer</option>
                            <option value="battlefleet_designer">Battlefleet designer</option>
                            <option value="coastal_defence_naval_manufacturer">Coastal defence fleet designer</option>
                            <option value="convoy_escort_naval_manufacturer">Convoy escort fleet designer</option>
                            <option value="mediterranean_naval_manufacturer">Mediterranean fleet designer</option>
                            <option value="pacific_fleet_naval_manufacturer">Pacific fleet designer</option>
                            <option value="raiding_fleet_naval_manufacturer">Raiding fleet designer</option>
                          </select>
                        </p>
                        <p class="tech_names">
                          <label class="bold">Doctrine</label><br/>
                          <select id="doct">
                            <option value="No_Doctrine">No doctrine</option>
                            <option value="Yes_Doctrine">Yes doctrine</option>
                          </select>
                        </p>
                        <p class="tech_names">
                          <label class="bold">Torpedo</label><br/>
                          <label class="container">
                            Magnetic fuze
                            <input type="checkbox" id="magnetic_fuze" value="Torpedo_1"></input>
                            <span class="checkmark"></span>
                          </label>
                          <br/>
                          <label class="container">
                            Acoustic torpedo
                            <input type="checkbox" id="acoustic_torpedo" value="Torpedo_2"></input>
                            <span class="checkmark"></span>
                          </label>
                          <br/>
                          <label class="container">
                            Torpex
                            <input type="checkbox" id="torpex" value="Torpedo_3"></input>
                            <span class="checkmark"></span>
                          </label>
                          <br/>
                        </p>
                        <p class="tech_names">
                          <label class="bold">Mines</label><br/>
                          <label class="container">
                            Torpedo tube mine deployment
                            <input type="checkbox" id="improved_submarine_mine_laying" value="Mines_1"></input>
                            <span class="checkmark"></span>
                          </label>
                          <br/>
                        </p>
                      </td>
                      <td class="techno_cell">
                        <p class="tech_names">
                          <label class="bold">Light shell</label><br/>
                          <label class="container">
                            High explosive-tracer shell
                            <input type="checkbox" id="basic_light_shell" value="Light_shell_1"></input>
                            <span class="checkmark"></span>
                          </label>
                          <br/>
                          <label class="container">
                            Common shell
                            <input type="checkbox" id="improved_light_shell" value="Light_shell_2" ></input>
                            <span class="checkmark"></span>
                          </label>
                          <br/>
                          <label class="container">
                            Special common shell
                            <input type="checkbox" id="advanced_light_shell" value="Light_shell_3"></input>
                            <span class="checkmark"></span>
                          </label>
                          <br/>
                        </p>
                        <p class="tech_names">
                          <label class="bold">Heavy shell</label><br/>
                          <label class="container">
                            Semi armor piercing capped shell
                            <input type="checkbox" id="basic_heavy_shell" value="Heavy_shell_1"></input>
                            <span class="checkmark"></span>
                          </label>
                          <br/>
                          <label class="container">
                            Armor piercing capped shell
                            <input type="checkbox" id="improved_heavy_shell" value="Heavy_shell_2"></input>
                            <span class="checkmark"></span>
                          </label>
                          <br/>
                          <label class="container">
                            Super heavy armor piercing shell
                            <input type="checkbox" id="advanced_heavy_shell" value="Heavy_shell_3"></input>
                            <span class="checkmark"></span>
                          </label>
                          <br/>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table id="stats">
                  <tbody>
                    <tr>
                      <td class="stats_cell">
                        <label class="bold">Base Stats</label>
                      </td>
                       <td class="stats_cell">
                        <label class="bold">Combat Stats</label>
                      </td>
                       <td class="stats_cell">
                        <label class="bold">Misc. Stats</label>
                      </td>
                    </tr>
                    <tr>
                       <td class="stats_cell">
                        <label>Max Speed : </label>
                        <label id='naval_speed'>36.0 kn</label>
                      </td>
                       <td class="stats_cell">
                        <label>Light Attack : </label>
                        <label id='lg_attack'>1.0</label>
                      </td>
                       <td class="stats_cell">
                        <label>Fuel Usage : </label>
                        <label id='fuel_consumption'>7.0</label>
                      </td>
                    </tr>
                    <tr>
                       <td class="stats_cell">
                        <label>Max Range : </label>
                        <label id='naval_range'>1500 km</label>
                      </td>
                       <td class="stats_cell">
                        <label>Light Piercing : </label>
                        <label id='lg_armor_piercing'>1.0</label>
                      </td>
                       <td class="stats_cell">
                        <label>Surface Visibility : </label>
                        <label id='surface_visibility'>10.0</label>
                      </td>
                    </tr>
                    <tr>
                       <td class="stats_cell">
                        <label>Organization : </label>
                        <label id='max_organisation'>40.0</label>
                      </td>
                       <td class="stats_cell">
                        <label>Heavy Attack : </label>
                        <label id='hg_attack'>0.0</label>
                      </td>
                       <td class="stats_cell">
                        <label>Surface Detection : </label>
                        <label id='surface_detection'>20.0</label>
                      </td>
                    </tr>
                    <tr>
                       <td class="stats_cell">
                        <label>HP : </label>
                        <label id='max_strength'>25.0</label>
                      </td>
                       <td class="stats_cell">
                        <label>Heavy Piercing : </label>
                        <label id='hg_armor_piercing'>0.0</label>
                      </td>
                       <td class="stats_cell">
                        <label>Sub Visibility : </label>
                        <label id='sub_visibility'>0.0</label>
                      </td>
                    </tr>
                    <tr>
                       <td class="stats_cell">
                        <label>Reliability : </label>
                        <label id='reliability'>64.0 %</label>
                      </td>
                       <td class="stats_cell">
                        <label>Torpedo Attack : </label>
                        <label id='torpedo_attack'>0.0</label>
                      </td>
                       <td class="stats_cell">
                        <label>Sub Detection : </label>
                        <label id='sub_detection'>1.0</label>
                      </td>
                    </tr>
                    <tr>
                       <td class="stats_cell">
                        <label>Supply Use : </label>
                        <label id='supply_consumption'>0.01</label>
                      </td>
                       <td class="stats_cell">
                        <label>Depth Charges : </label>
                        <label id='sub_attack'>1.0</label>
                      </td>
                       <td class="stats_cell">
                        <label>Minelaying : </label>
                        <label id='mines_planting'>0.00</label>
                      </td>
                    </tr>
                    <tr>
                       <td class="stats_cell">
                        <label>Manpower : </label>
                        <label id='manpower'>250</label>
                      </td>
                       <td class="stats_cell">
                        <label>Armor : </label>
                        <label id='armor_value'>0.0</label>
                      </td>
                       <td class="stats_cell">
                        <label>Minesweeping : </label>
                        <label id='mines_sweeping'>0.00</label>
                      </td>
                    </tr>
                    <tr>
                       <td class="stats_cell">
                        <label>Deck Size : </label>
                        <label id='carrier_size'>0</label>
                      </td>
                       <td class="stats_cell">
                        <label>Anti-Air : </label>
                        <label id='anti_air_attack'>0.0</label>
                      </td>
                    </tr>
                    <tr>
                       <td class="stats_cell">
                        <label>Steel : </label>
                        <label id='steel'>2</label>
                      </td>
                       <td class="stats_cell">
                        <label>Chromium : </label>
                        <label id='chromium'>0</label>
                      </td>
                       <td class="stats_cell">
                        <label>Production Cost : </label>
                        <label id='build_cost_ic'>580</label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <br/>
        <div class="button" >
          <button class="urlbutton" type="button" onClick={() => this.copytoclip()}>Copy URL to clipboard</button>
        </div>
        <input id="inputcopy" type="text"/>
      </div>
    ;

    var bcopy = this.reactElementCopy(b)

    if(this.queryString.length != 0 && this.onceever == 0){
      this.set = this.urlParams.get("hull")
      acopy["props"]["children"][3]["props"]["children"]["props"]["children"][this.set]["props"]["selected"] = true;
    }

    /* 
    HULL LIST WITH THEIR SLOTS AND ALL ; KEEP SEPARATE FROM REST OF THE CODE OR ITS GONNA BECOME UNREADABLY UGLY
    */

    //Hull inclusion template
    if (this.set == -2){
      var s = 
        <div></div>
      ;
    }

    // DD
    if(this.set == 0){
      var s =
      <div class="center nojump">
        <select class="equipselect" id="slot1">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_depth_charge_1">Depth Charge 1</option>
          <option value="ship_depth_charge_2">Depth Charge 2</option>
          <option value="ship_depth_charge_3">Depth Charge 3</option>
          <option value="ship_depth_charge_4">Depth Charge 4</option>
          <option class="grey" value="ship_mine_layer">Minelaying Rails</option>
          <option value="ship_mine_sweeper">Minesweeping Gears</option>
        </select>
        <select class="equipselect" id="slot2">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_depth_charge_1">Depth Charge 1</option>
          <option value="ship_depth_charge_2">Depth Charge 2</option>
          <option value="ship_depth_charge_3">Depth Charge 3</option>
          <option value="ship_depth_charge_4">Depth Charge 4</option>
          <option class="grey" value="ship_mine_layer">Minelaying Rails</option>
          <option value="ship_mine_sweeper">Minesweeping Gears</option>
        </select>
        <select class="equipselect" id="slot3">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_torpedo_1">Torpedo Launcher 1</option>
          <option class="grey" value="ship_torpedo_2">Torpedo Launcher 2</option>
        </select>
        <select class="equipselect" id="slot4">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_torpedo_1">Torpedo Launcher 1</option>
          <option class="grey" value="ship_torpedo_2">Torpedo Launcher 2</option>
        </select>
        <select class="equipselect" id="slot5">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_torpedo_1">Torpedo Launcher 1</option>
          <option class="grey" value="ship_torpedo_2">Torpedo Launcher 2</option>
        </select>
        <select class="equipselect" id="slot6">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
        </select>
        <select class="equipselect" id="slot7">
          <option value="Locked">Locked</option>
        </select>

        <div id="picdiv">
          <img class="pict" src="https://i12.servimg.com/u/f12/19/44/96/17/destro10.png"/>
          <label id="isCapital"><img class="capital" src="https://i12.servimg.com/u/f12/19/44/96/17/notcap10.png"/></label>
        </div>
        <br/>

        <select class="equipselect" id="slot8">
          <option value="ship_light_battery_1">Light Battery 1</option>
          <option value="ship_light_battery_2">Light Battery 2</option>
          <option value="ship_light_battery_3">Light Battery 3</option>
          <option value="ship_light_battery_4">Light Battery 4</option>
        </select>
        <select class="equipselect" id="slot9">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_fire_control_system_1">Fire Control 1</option>
          <option class="grey" value="ship_fire_control_system_2">Fire Control 2</option>
          <option class="grey" value="ship_fire_control_system_3">Fire Control 3</option>
          <option class="grey" value="ship_fire_control_system_4">Fire Control 4</option>
          <option value="ship_sonar_1">Sonar 1</option>
          <option value="ship_sonar_2">Sonar 2</option>
          <option value="ship_sonar_3">Sonar 3</option>
          <option value="ship_sonar_4">Sonar 4</option>
        </select>
        <select class="equipselect" id="slot10">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_surveillance_radar_1">Surveillance Radar 1</option>
          <option class="grey" value="ship_surveillance_radar_2">Surveillance Radar 2</option>
          <option class="grey" value="ship_surveillance_radar_3">Surveillance Radar 3</option>
          <option class="grey" value="ship_surveillance_radar_4">Surveillance Radar 4</option>
          <option value="ship_fire_control_radar_1">Fire Control Radar 1</option>
          <option value="ship_fire_control_radar_2">Fire Control Radar 2</option>
        </select>
        <select class="equipselect" id="slot11">
          <option value="light_ship_deprecated_engine">Light Deprecated Engine</option>
          <option value="light_ship_range_engine_1">Light Range Engine 1</option>
          <option value="light_ship_range_engine_2">Light Range Engine 2</option>
          <option value="light_ship_range_engine_3">Light Range Engine 3</option>
          <option value="light_ship_range_engine_4">Light Range Engine 4</option>
          <option value="light_ship_perf_engine_1">Light Perf Engine 1</option>
          <option value="light_ship_perf_engine_2">Light Perf Engine 2</option>
          <option value="light_ship_perf_engine_3">Light Perf Engine 3</option>
          <option value="light_ship_perf_engine_4">Light Perf Engine 4</option>
        </select>
        <select class="equipselect" id="slot12">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="damage_control_system_1">Damage Control 1</option>
          <option value="damage_control_system_2">Damage Control 2</option>
          <option value="damage_control_system_3">Damage Control 3</option>
          <option value="reinforced_structure">Reinforced Structure</option>
        </select>
        <select class="equipselect" id="slot13">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="ship_light_armor">Light Armor</option>
        </select>
        <select class="equipselect" id="slot14">
          <option value="Locked">Locked</option>
        </select>
      </div>
      ;
    }

    // CL
    else if (this.set == 1){
      var s = 
      <div class="center nojump">
        <select class="equipselect" id="slot1">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
          <option value="ship_depth_charge_1">Depth Charge 1</option>
          <option value="ship_depth_charge_2">Depth Charge 2</option>
          <option value="ship_depth_charge_3">Depth Charge 3</option>
          <option value="ship_depth_charge_4">Depth Charge 4</option>
          <option class="grey" value="ship_mine_layer">Minelaying Rails</option>
        </select>
        <select class="equipselect" id="slot2">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
          <option value="ship_depth_charge_1">Depth Charge 1</option>
          <option value="ship_depth_charge_2">Depth Charge 2</option>
          <option value="ship_depth_charge_3">Depth Charge 3</option>
          <option value="ship_depth_charge_4">Depth Charge 4</option>
          <option class="grey" value="ship_mine_layer">Minelaying Rails</option>
        </select>
        <select class="equipselect" id="slot3">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_torpedo_1">Torpedo Launcher 1</option>
          <option value="ship_torpedo_2">Torpedo Launcher 2</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
          <option value="ship_mine_layer">Minelaying Rails</option>
        </select>
        <select class="equipselect" id="slot4">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_torpedo_1">Torpedo Launcher 1</option>
          <option value="ship_torpedo_2">Torpedo Launcher 2</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot5">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_torpedo_1">Torpedo Launcher 1</option>
          <option value="ship_torpedo_2">Torpedo Launcher 2</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot6">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_torpedo_1">Torpedo Launcher 1</option>
          <option value="ship_torpedo_2">Torpedo Launcher 2</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot7">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
        </select>

        <div id="picdiv">
          <img class="pict" src="https://i12.servimg.com/u/f12/19/44/96/17/cruise10.png"/>
          <label id="isCapital"><img class="capital" src="https://i12.servimg.com/u/f12/19/44/96/17/notcap10.png"/></label>
        </div>
        <br/>

        <select class="equipselect" id="slot8">
          <option value="ship_light_battery_1">Light Battery 1</option>
          <option value="ship_light_battery_2">Light Battery 2</option>
          <option value="ship_light_battery_3">Light Battery 3</option>
          <option value="ship_light_battery_4">Light Battery 4</option>
          <option class="grey" value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option class="grey" value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option class="grey" value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option class="grey" value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
        </select>
        <select class="equipselect" id="slot9">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_fire_control_system_1">Fire Control 1</option>
          <option class="grey" value="ship_fire_control_system_2">Fire Control 2</option>
          <option class="grey" value="ship_fire_control_system_3">Fire Control 3</option>
          <option class="grey" value="ship_fire_control_system_4">Fire Control 4</option>
          <option value="ship_sonar_1">Sonar 1</option>
          <option value="ship_sonar_2">Sonar 2</option>
          <option value="ship_sonar_3">Sonar 3</option>
          <option value="ship_sonar_4">Sonar 4</option>
        </select>
        <select class="equipselect" id="slot10">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_surveillance_radar_1">Surveillance Radar 1</option>
          <option class="grey" value="ship_surveillance_radar_2">Surveillance Radar 2</option>
          <option class="grey" value="ship_surveillance_radar_3">Surveillance Radar 3</option>
          <option class="grey" value="ship_surveillance_radar_4">Surveillance Radar 4</option>
          <option value="ship_fire_control_radar_1">Fire Control Radar 1</option>
          <option value="ship_fire_control_radar_2">Fire Control Radar 2</option>
        </select>
        <select class="equipselect" id="slot11">
          <option value="medium_ship_deprecated_engine">Medium Deprecated Engine</option>
          <option value="medium_ship_range_engine_1">Medium Range Engine 1</option>
          <option value="medium_ship_range_engine_2">Medium Range Engine 2</option>
          <option value="medium_ship_range_engine_3">Medium Range Engine 3</option>
          <option value="medium_ship_range_engine_4">Medium Range Engine 4</option>
          <option value="medium_ship_perf_engine_1">Medium Perf Engine 1</option>
          <option value="medium_ship_perf_engine_2">Medium Perf Engine 2</option>
          <option value="medium_ship_perf_engine_3">Medium Perf Engine 3</option>
          <option value="medium_ship_perf_engine_4">Medium Perf Engine 4</option>
        </select>
        <select class="equipselect" id="slot12">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="damage_control_system_1">Damage Control 1</option>
          <option value="damage_control_system_2">Damage Control 2</option>
          <option value="damage_control_system_3">Damage Control 3</option>
          <option value="reinforced_structure">Reinforced Structure</option>
        </select>
        <select class="equipselect" id="slot13">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="ship_light_armor">Light Armor</option>
          <option class="grey" value="ship_medium_armor_1">Medium Armor 1</option>
          <option class="grey" value="ship_medium_armor_2">Medium Armor 2</option>
          <option class="grey" value="ship_medium_armor_3">Medium Armor 3</option>
          <option class="grey" value="ship_medium_armor_4">Medium Armor 4</option>
        </select>
        <select class="equipselect" id="slot14">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="ship_light_armor">Light Armor</option>
          <option class="grey" value="ship_medium_armor_1">Medium Armor 1</option>
          <option class="grey" value="ship_medium_armor_2">Medium Armor 2</option>
          <option class="grey" value="ship_medium_armor_3">Medium Armor 3</option>
          <option class="grey" value="ship_medium_armor_4">Medium Armor 4</option>
        </select>
      </div>
      ;
    }

    // CA
    else if (this.set == 2){
      var s = 
      <div class="center nojump">
        <select class="equipselect" id="slot1">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_heavy_medium_battery_1">Heavy Cruiser Battery 1</option>
          <option value="ship_heavy_medium_battery_2">Heavy Cruiser Battery 2</option>
          <option value="ship_heavy_medium_battery_3">Heavy Cruiser Battery 3</option>
          <option value="ship_heavy_medium_battery_4">Heavy Cruiser Battery 4</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
          <option value="ship_depth_charge_1">Depth Charge 1</option>
          <option value="ship_depth_charge_2">Depth Charge 2</option>
          <option value="ship_depth_charge_3">Depth Charge 3</option>
          <option value="ship_depth_charge_4">Depth Charge 4</option>
          <option class="grey" value="ship_mine_layer">Minelaying Rails</option>
        </select>
        <select class="equipselect" id="slot2">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_heavy_medium_battery_1">Heavy Cruiser Battery 1</option>
          <option value="ship_heavy_medium_battery_2">Heavy Cruiser Battery 2</option>
          <option value="ship_heavy_medium_battery_3">Heavy Cruiser Battery 3</option>
          <option value="ship_heavy_medium_battery_4">Heavy Cruiser Battery 4</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
          <option value="ship_depth_charge_1">Depth Charge 1</option>
          <option value="ship_depth_charge_2">Depth Charge 2</option>
          <option value="ship_depth_charge_3">Depth Charge 3</option>
          <option value="ship_depth_charge_4">Depth Charge 4</option>
          <option class="grey" value="ship_mine_layer">Minelaying Rails</option>
        </select>
        <select class="equipselect" id="slot3">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_torpedo_1">Torpedo Launcher 1</option>
          <option value="ship_torpedo_2">Torpedo Launcher 2</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
          <option value="ship_mine_layer">Minelaying Rails</option>
        </select>
        <select class="equipselect" id="slot4">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_torpedo_1">Torpedo Launcher 1</option>
          <option value="ship_torpedo_2">Torpedo Launcher 2</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot5">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_torpedo_1">Torpedo Launcher 1</option>
          <option value="ship_torpedo_2">Torpedo Launcher 2</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot6">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_torpedo_1">Torpedo Launcher 1</option>
          <option value="ship_torpedo_2">Torpedo Launcher 2</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot7">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_heavy_medium_battery_1">Heavy Cruiser Battery 1</option>
          <option value="ship_heavy_medium_battery_2">Heavy Cruiser Battery 2</option>
          <option value="ship_heavy_medium_battery_3">Heavy Cruiser Battery 3</option>
          <option value="ship_heavy_medium_battery_4">Heavy Cruiser Battery 4</option>
        </select>

        <div id="picdiv">
          <img class="pict" src="https://i12.servimg.com/u/f12/19/44/96/17/cruise10.png"/>
          <label id="isCapital"><img class="capital" src="https://i12.servimg.com/u/f12/19/44/96/17/capita10.png"/></label>
        </div>
        <br/>

        <select class="equipselect" id="slot8">
          <option value="ship_heavy_medium_battery_1">Heavy Cruiser Battery 1</option>
          <option value="ship_heavy_medium_battery_2">Heavy Cruiser Battery 2</option>
          <option value="ship_heavy_medium_battery_3">Heavy Cruiser Battery 3</option>
          <option value="ship_heavy_medium_battery_4">Heavy Cruiser Battery 4</option>
        </select>
        <select class="equipselect" id="slot9">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_fire_control_system_1">Fire Control 1</option>
          <option class="grey" value="ship_fire_control_system_2">Fire Control 2</option>
          <option class="grey" value="ship_fire_control_system_3">Fire Control 3</option>
          <option class="grey" value="ship_fire_control_system_4">Fire Control 4</option>
          <option value="ship_sonar_1">Sonar 1</option>
          <option value="ship_sonar_2">Sonar 2</option>
          <option value="ship_sonar_3">Sonar 3</option>
          <option value="ship_sonar_4">Sonar 4</option>
        </select>
        <select class="equipselect" id="slot10">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_surveillance_radar_1">Surveillance Radar 1</option>
          <option class="grey" value="ship_surveillance_radar_2">Surveillance Radar 2</option>
          <option class="grey" value="ship_surveillance_radar_3">Surveillance Radar 3</option>
          <option class="grey" value="ship_surveillance_radar_4">Surveillance Radar 4</option>
          <option value="ship_fire_control_radar_1">Fire Control Radar 1</option>
          <option value="ship_fire_control_radar_2">Fire Control Radar 2</option>
        </select>
        <select class="equipselect" id="slot11">
          <option value="medium_ship_deprecated_engine">Medium Deprecated Engine</option>
          <option value="medium_ship_range_engine_1">Medium Range Engine 1</option>
          <option value="medium_ship_range_engine_2">Medium Range Engine 2</option>
          <option value="medium_ship_range_engine_3">Medium Range Engine 3</option>
          <option value="medium_ship_range_engine_4">Medium Range Engine 4</option>
          <option value="medium_ship_perf_engine_1">Medium Perf Engine 1</option>
          <option value="medium_ship_perf_engine_2">Medium Perf Engine 2</option>
          <option value="medium_ship_perf_engine_3">Medium Perf Engine 3</option>
          <option value="medium_ship_perf_engine_4">Medium Perf Engine 4</option>
        </select>
        <select class="equipselect" id="slot12">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="damage_control_system_1">Damage Control 1</option>
          <option value="damage_control_system_2">Damage Control 2</option>
          <option value="damage_control_system_3">Damage Control 3</option>
          <option value="reinforced_structure">Reinforced Structure</option>
        </select>
        <select class="equipselect" id="slot13">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="ship_light_armor">Light Armor</option>
          <option class="grey" value="ship_medium_armor_1">Medium Armor 1</option>
          <option class="grey" value="ship_medium_armor_2">Medium Armor 2</option>
          <option class="grey" value="ship_medium_armor_3">Medium Armor 3</option>
          <option class="grey" value="ship_medium_armor_4">Medium Armor 4</option>
        </select>
        <select class="equipselect" id="slot14">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="ship_light_armor">Light Armor</option>
          <option class="grey" value="ship_medium_armor_1">Medium Armor 1</option>
          <option class="grey" value="ship_medium_armor_2">Medium Armor 2</option>
          <option class="grey" value="ship_medium_armor_3">Medium Armor 3</option>
          <option class="grey" value="ship_medium_armor_4">Medium Armor 4</option>
        </select>
      </div>
      ;
    }

    // CVL
    else if (this.set == 3){
      var s = 
      <div class="center nojump">
        <select class="equipselect" id="slot1">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_deck_space">Hangar Space</option>
        </select>
        <select class="equipselect" id="slot2">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_deck_space">Hangar Space</option>
        </select>
        <select class="equipselect" id="slot3">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
        </select>
        <select class="equipselect" id="slot4">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
        </select>
        <select class="equipselect" id="slot5">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_deck_space">Hangar Space</option>
        </select>
        <select class="equipselect" id="slot6">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_deck_space">Hangar Space</option>
        </select>
        <select class="equipselect" id="slot7">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_deck_space">Hangar Space</option>
        </select>

        <div id="picdiv">
          <img class="pict" src="https://i12.servimg.com/u/f12/19/44/96/17/carrie10.png"/>
          <label id="isCapital"><img class="capital" src="https://i12.servimg.com/u/f12/19/44/96/17/capita10.png"/></label>
        </div>
        <br/>

        <select class="equipselect" id="slot8">
          <option value="ship_deck_space">Hangar Space</option>
        </select>
        <select class="equipselect" id="slot9">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_fire_control_system_1">Fire Control 1</option>
          <option class="grey" value="ship_fire_control_system_2">Fire Control 2</option>
          <option class="grey" value="ship_fire_control_system_3">Fire Control 3</option>
          <option class="grey" value="ship_fire_control_system_4">Fire Control 4</option>
        </select>
        <select class="equipselect" id="slot10">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_surveillance_radar_1">Surveillance Radar 1</option>
          <option class="grey" value="ship_surveillance_radar_2">Surveillance Radar 2</option>
          <option class="grey" value="ship_surveillance_radar_3">Surveillance Radar 3</option>
          <option class="grey" value="ship_surveillance_radar_4">Surveillance Radar 4</option>
          <option value="ship_fire_control_radar_1">Fire Control Radar 1</option>
          <option value="ship_fire_control_radar_2">Fire Control Radar 2</option>
        </select>
        <select class="equipselect" id="slot11">
          <option value="medium_ship_deprecated_engine">Medium Deprecated Engine</option>
          <option value="medium_ship_range_engine_1">Medium Range Engine 1</option>
          <option value="medium_ship_range_engine_2">Medium Range Engine 2</option>
          <option value="medium_ship_range_engine_3">Medium Range Engine 3</option>
          <option value="medium_ship_range_engine_4">Medium Range Engine 4</option>
          <option value="medium_ship_perf_engine_1">Medium Perf Engine 1</option>
          <option value="medium_ship_perf_engine_2">Medium Perf Engine 2</option>
          <option value="medium_ship_perf_engine_3">Medium Perf Engine 3</option>
          <option value="medium_ship_perf_engine_4">Medium Perf Engine 4</option>
        </select>
        <select class="equipselect" id="slot12">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="damage_control_system_1">Damage Control 1</option>
          <option value="damage_control_system_2">Damage Control 2</option>
          <option value="damage_control_system_3">Damage Control 3</option>
          <option value="reinforced_structure">Reinforced Structure</option>
        </select>
        <select class="equipselect" id="slot13">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="ship_light_armor">Light Armor</option>
          <option class="grey" value="ship_medium_armor_1">Medium Armor 1</option>
          <option class="grey" value="ship_medium_armor_2">Medium Armor 2</option>
          <option class="grey" value="ship_medium_armor_3">Medium Armor 3</option>
          <option class="grey" value="ship_medium_armor_4">Medium Armor 4</option>
          <option value="ship_unarmored_hangar">Unarmored Hangar</option>
        </select>
        <select class="equipselect" id="slot14">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="ship_light_armor">Light Armor</option>
          <option class="grey" value="ship_medium_armor_1">Medium Armor 1</option>
          <option class="grey" value="ship_medium_armor_2">Medium Armor 2</option>
          <option class="grey" value="ship_medium_armor_3">Medium Armor 3</option>
          <option class="grey" value="ship_medium_armor_4">Medium Armor 4</option>
        </select>
      </div>
      ;
    }

    // BB
    else if (this.set == 4){
      var s = 
      <div class="center nojump">
        <select class="equipselect" id="slot1">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_heavy_battery_1">Heavy Battery 1</option>
          <option class="grey" value="ship_heavy_battery_2">Heavy Battery 2</option>
          <option class="grey" value="ship_heavy_battery_3">Heavy Battery 3</option>
          <option class="grey" value="ship_heavy_battery_4">Heavy Battery 4</option>
          <option value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot2">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
          <option class="grey" value="ship_heavy_battery_1">Heavy Battery 1</option>
          <option class="grey" value="ship_heavy_battery_2">Heavy Battery 2</option>
          <option class="grey" value="ship_heavy_battery_3">Heavy Battery 3</option>
          <option class="grey" value="ship_heavy_battery_4">Heavy Battery 4</option>
          <option value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot3">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot4">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot5">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot6">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot7">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
          <option class="grey" value="ship_heavy_battery_1">Heavy Battery 1</option>
          <option class="grey" value="ship_heavy_battery_2">Heavy Battery 2</option>
          <option class="grey" value="ship_heavy_battery_3">Heavy Battery 3</option>
          <option class="grey" value="ship_heavy_battery_4">Heavy Battery 4</option>
        </select>

        <div id="picdiv">
          <img class="pict" src="https://i12.servimg.com/u/f12/19/44/96/17/battle10.png"/>
          <label id="isCapital"><img class="capital" src="https://i12.servimg.com/u/f12/19/44/96/17/capita10.png"/></label>
        </div>
        <br/>

        <select class="equipselect" id="slot8">
          <option value="ship_heavy_battery_1">Heavy Battery 1</option>
          <option value="ship_heavy_battery_2">Heavy Battery 2</option>
          <option value="ship_heavy_battery_3">Heavy Battery 3</option>
          <option value="ship_heavy_battery_4">Heavy Battery 4</option>
        </select>
        <select class="equipselect" id="slot9">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_fire_control_system_1">Fire Control 1</option>
          <option class="grey" value="ship_fire_control_system_2">Fire Control 2</option>
          <option class="grey" value="ship_fire_control_system_3">Fire Control 3</option>
          <option class="grey" value="ship_fire_control_system_4">Fire Control 4</option>
        </select>
        <select class="equipselect" id="slot10">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_surveillance_radar_1">Surveillance Radar 1</option>
          <option class="grey" value="ship_surveillance_radar_2">Surveillance Radar 2</option>
          <option class="grey" value="ship_surveillance_radar_3">Surveillance Radar 3</option>
          <option class="grey" value="ship_surveillance_radar_4">Surveillance Radar 4</option>
          <option value="ship_fire_control_radar_1">Fire Control Radar 1</option>
          <option value="ship_fire_control_radar_2">Fire Control Radar 2</option>
        </select>
        <select class="equipselect" id="slot11">
          <option value="heavy_ship_deprecated_engine">Heavy Deprecated Engine</option>
          <option value="heavy_ship_range_engine_1">Heavy Range Engine 1</option>
          <option value="heavy_ship_range_engine_2">Heavy Range Engine 2</option>
          <option value="heavy_ship_range_engine_3">Heavy Range Engine 3</option>
          <option value="heavy_ship_range_engine_4">Heavy Range Engine 4</option>
          <option value="heavy_ship_perf_engine_1">Heavy Perf Engine 1</option>
          <option value="heavy_ship_perf_engine_2">Heavy Perf Engine 2</option>
          <option value="heavy_ship_perf_engine_3">Heavy Perf Engine 3</option>
          <option value="heavy_ship_perf_engine_4">Heavy Perf Engine 4</option>
        </select>
        <select class="equipselect" id="slot12">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="damage_control_system_1">Damage Control 1</option>
          <option value="damage_control_system_2">Damage Control 2</option>
          <option value="damage_control_system_3">Damage Control 3</option>
          <option value="reinforced_structure">Reinforced Structure</option>
        </select>
        <select class="equipselect" id="slot13">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="ship_medium_armor_1">Medium Armor 1</option>
          <option value="ship_medium_armor_2">Medium Armor 2</option>
          <option value="ship_medium_armor_3">Medium Armor 3</option>
          <option value="ship_medium_armor_4">Medium Armor 4</option>
          <option class="grey" value="ship_heavy_armor_1">Heavy Armor 1</option>
          <option class="grey" value="ship_heavy_armor_2">Heavy Armor 2</option>
          <option class="grey" value="ship_heavy_armor_3">Heavy Armor 3</option>
          <option class="grey" value="ship_heavy_armor_4">Heavy Armor 4</option>
        </select>
        <select class="equipselect" id="slot14">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="ship_medium_armor_1">Medium Armor 1</option>
          <option value="ship_medium_armor_2">Medium Armor 2</option>
          <option value="ship_medium_armor_3">Medium Armor 3</option>
          <option value="ship_medium_armor_4">Medium Armor 4</option>
          <option class="grey" value="ship_heavy_armor_1">Heavy Armor 1</option>
          <option class="grey" value="ship_heavy_armor_2">Heavy Armor 2</option>
          <option class="grey" value="ship_heavy_armor_3">Heavy Armor 3</option>
          <option class="grey" value="ship_heavy_armor_4">Heavy Armor 4</option>
        </select>
      </div>
      ;
    }

    // CV
    else if (this.set == 5){
      var s = 
      <div class="center nojump">
        <select class="equipselect" id="slot1">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
          <option class="grey" value="ship_deck_space">Hangar Space</option>
          <option value="ship_large_deck_space">Large Hangar Space</option>
        </select>
        <select class="equipselect" id="slot2">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
          <option class="grey" value="ship_deck_space">Hangar Space</option>
          <option value="ship_large_deck_space">Large Hangar Space</option>
        </select>
        <select class="equipselect" id="slot3">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
        </select>
        <select class="equipselect" id="slot4">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
        </select>
        <select class="equipselect" id="slot5">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
        </select>
        <select class="equipselect" id="slot6">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
          <option class="grey" value="ship_deck_space">Hangar Space</option>
        </select>
        <select class="equipselect" id="slot7">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_anti_air_1">Anti-Air 1</option>
          <option value="ship_anti_air_2">Anti-Air 2</option>
          <option value="ship_anti_air_3">Anti-Air 3</option>
          <option value="ship_anti_air_4">Anti-Air 4</option>
          <option class="grey" value="ship_light_battery_1">Light Battery 1</option>
          <option class="grey" value="ship_light_battery_2">Light Battery 2</option>
          <option class="grey" value="ship_light_battery_3">Light Battery 3</option>
          <option class="grey" value="ship_light_battery_4">Light Battery 4</option>
          <option value="ship_light_medium_battery_1">Light Cruiser Battery 1</option>
          <option value="ship_light_medium_battery_2">Light Cruiser Battery 2</option>
          <option value="ship_light_medium_battery_3">Light Cruiser Battery 3</option>
          <option value="ship_light_medium_battery_4">Light Cruiser Battery 4</option>
          <option class="grey" value="ship_deck_space">Hangar Space</option>
          <option value="ship_large_deck_space">Large Hangar Space</option>
        </select>

        <div id="picdiv">
          <img class="pict" src="https://i12.servimg.com/u/f12/19/44/96/17/carrie10.png"/>
          <label id="isCapital"><img class="capital" src="https://i12.servimg.com/u/f12/19/44/96/17/capita10.png"/></label>
        </div>
        <br/>

        <select class="equipselect" id="slot8">
          <option value="ship_deck_space">Hangar Space</option>
          <option class="grey" value="ship_large_deck_space">Large Hangar Space</option>
        </select>
       <select class="equipselect" id="slot9">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_fire_control_system_1">Fire Control 1</option>
          <option class="grey" value="ship_fire_control_system_2">Fire Control 2</option>
          <option class="grey" value="ship_fire_control_system_3">Fire Control 3</option>
          <option class="grey" value="ship_fire_control_system_4">Fire Control 4</option>
        </select>
        <select class="equipselect" id="slot10">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_surveillance_radar_1">Surveillance Radar 1</option>
          <option class="grey" value="ship_surveillance_radar_2">Surveillance Radar 2</option>
          <option class="grey" value="ship_surveillance_radar_3">Surveillance Radar 3</option>
          <option class="grey" value="ship_surveillance_radar_4">Surveillance Radar 4</option>
          <option value="ship_fire_control_radar_1">Fire Control Radar 1</option>
          <option value="ship_fire_control_radar_2">Fire Control Radar 2</option>
        </select>
        <select class="equipselect" id="slot11">
          <option value="heavy_ship_deprecated_engine">Heavy Deprecated Engine</option>
          <option value="heavy_ship_range_engine_1">Heavy Range Engine 1</option>
          <option value="heavy_ship_range_engine_2">Heavy Range Engine 2</option>
          <option value="heavy_ship_range_engine_3">Heavy Range Engine 3</option>
          <option value="heavy_ship_range_engine_4">Heavy Range Engine 4</option>
          <option value="heavy_ship_perf_engine_1">Heavy Perf Engine 1</option>
          <option value="heavy_ship_perf_engine_2">Heavy Perf Engine 2</option>
          <option value="heavy_ship_perf_engine_3">Heavy Perf Engine 3</option>
          <option value="heavy_ship_perf_engine_4">Heavy Perf Engine 4</option>
        </select>
        <select class="equipselect" id="slot12">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="damage_control_system_1">Damage Control 1</option>
          <option value="damage_control_system_2">Damage Control 2</option>
          <option value="damage_control_system_3">Damage Control 3</option>
          <option value="reinforced_structure">Reinforced Structure</option>
        </select>
        <select class="equipselect" id="slot13">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="ship_medium_armor_1">Medium Armor 1</option>
          <option value="ship_medium_armor_2">Medium Armor 2</option>
          <option value="ship_medium_armor_3">Medium Armor 3</option>
          <option value="ship_medium_armor_4">Medium Armor 4</option>
          <option class="grey" value="ship_heavy_armor_1">Heavy Armor 1</option>
          <option class="grey" value="ship_heavy_armor_2">Heavy Armor 2</option>
          <option class="grey" value="ship_heavy_armor_3">Heavy Armor 3</option>
          <option class="grey" value="ship_heavy_armor_4">Heavy Armor 4</option>
          <option value="ship_unarmored_hangar">Unarmored Hangar</option>
        </select>
        <select class="equipselect" id="slot14">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="ship_medium_armor_1">Medium Armor 1</option>
          <option value="ship_medium_armor_2">Medium Armor 2</option>
          <option value="ship_medium_armor_3">Medium Armor 3</option>
          <option value="ship_medium_armor_4">Medium Armor 4</option>
          <option class="grey" value="ship_heavy_armor_1">Heavy Armor 1</option>
          <option class="grey" value="ship_heavy_armor_2">Heavy Armor 2</option>
          <option class="grey" value="ship_heavy_armor_3">Heavy Armor 3</option>
          <option class="grey" value="ship_heavy_armor_4">Heavy Armor 4</option>
        </select>
      </div>
      ;
    }

    // SS
    else if (this.set == 6){
      var s = 
      <div class="center nojump">
        <select class="equipselect" id="slot1">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_torpedo_sub_1">Torpedo Tubes 1</option>
          <option value="ship_torpedo_sub_2">Torpedo Tubes 2</option>
          <option class="grey" value="ship_mine_layer_sub">Minelaying Tubes</option>
        </select>
        <select class="equipselect" id="slot2">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_torpedo_sub_1">Torpedo Tubes 1</option>
          <option value="ship_torpedo_sub_2">Torpedo Tubes 2</option>
          <option class="grey" value="ship_mine_layer_sub">Minelaying Tubes</option>
        </select>
        <select class="equipselect" id="slot3">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_torpedo_sub_1">Torpedo Tubes 1</option>
          <option value="ship_torpedo_sub_2">Torpedo Tubes 2</option>
        </select>
        <select class="equipselect" id="slot4">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_torpedo_sub_1">Torpedo Tubes 1</option>
          <option value="ship_torpedo_sub_2">Torpedo Tubes 2</option>
        </select>
        <select class="equipselect" id="slot5">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_unavailable_space">Unavailable</option>
          <option value="ship_torpedo_sub_1">Torpedo Tubes 1</option>
          <option value="ship_torpedo_sub_2">Torpedo Tubes 2</option>
        </select>
        <select class="equipselect" id="slot6">
          <option value="Locked">Locked</option>
        </select>
        <select class="equipselect" id="slot7">
          <option value="Locked">Locked</option>
        </select>

        <div id="picdiv">
          <img class="pict" src="https://i12.servimg.com/u/f12/19/44/96/17/submar10.png"/>
          <label id="isCapital"><img class="capital" src="https://i12.servimg.com/u/f12/19/44/96/17/notcap10.png"/></label>
        </div>
        <br/>

        <select class="equipselect" id="slot8">
          <option value="ship_torpedo_sub_1">Torpedo Tubes 1</option>
          <option value="ship_torpedo_sub_2">Torpedo Tubes 2</option>
        </select>
        <select class="equipselect" id="slot9">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_surveillance_radar_1">Surveillance Radar 1</option>
          <option class="grey" value="ship_surveillance_radar_2">Surveillance Radar 2</option>
          <option class="grey" value="ship_surveillance_radar_3">Surveillance Radar 3</option>
          <option class="grey" value="ship_surveillance_radar_4">Surveillance Radar 4</option>
        </select>
        <select class="equipselect" id="slot10">
          <option value="sub_ship_deprecated_engine">Submarine Deprecated Engine</option>
          <option value="sub_ship_engine_1">Submarine Engine 1</option>
          <option value="sub_ship_engine_2">Submarine Engine 2</option>
          <option value="sub_ship_engine_3">Submarine Engine 3</option>
          <option value="sub_ship_engine_4">Submarine Engine 4</option>
        </select>
        <select class="equipselect" id="slot11">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="damage_control_system_1">Damage Control 1</option>
          <option value="damage_control_system_2">Damage Control 2</option>
          <option value="damage_control_system_3">Damage Control 3</option>
          <option value="reinforced_structure">Reinforced Structure</option>
        </select>
        <select class="equipselect" id="slot12">
          <option value="Empty">Empty</option>
          <option class="grey" value="ship_extra_fuel_tank">Fuel Tank</option>
          <option value="ship_sub_snorkel_1">Snorkel 1</option>
          <option value="ship_sub_snorkel_2">Snorkel 2</option>
          <option class="grey" value="ship_airplane_launcher">Floatplane Catapult</option>
        </select>
        <select class="equipselect" id="slot13">
          <option value="Locked">Locked</option>
        </select>
        <select class="equipselect" id="slot14">
          <option value="Locked">Locked</option>
        </select>
      </div>
      ;
    }

    var scopy = this.reactElementCopy(s)

    /* 
    END OF HULL LIST WITH THEIR SLOTS AND ALL ; KEEP SEPARATE FROM REST OF THE CODE OR ITS GONNA BECOME UNREADABLY UGLY
    */

    console.log(acopy)

    if(this.queryString.length != 0 && this.onceever == 0){

      for(var i = 1; i<15; i++){
        if(this.urlParams.get("s"+i)!=null && this.urlParams.get("s"+i)!=0){
          if(i<8){
            scopy["props"]["children"][i-1]["props"]["children"][this.urlParams.get("s"+i)]["props"]["selected"]=true
          } else {
            scopy["props"]["children"][i+1]["props"]["children"][this.urlParams.get("s"+i)]["props"]["selected"]=true
          }
        }
      }
      if(this.urlParams.get("de")!=null){
        bcopy["props"]["children"][2]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"][0]["props"]["children"][2]["props"]["children"][this.urlParams.get("de")]["props"]["selected"]=true
      }
      if(this.urlParams.get("do")!=null){
        bcopy["props"]["children"][2]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"][1]["props"]["children"][2]["props"]["children"][this.urlParams.get("do")]["props"]["selected"]=true
      }

      //torp tech & mine techs

      if(this.urlParams.get("mf")!=null){
        bcopy["props"]["children"][2]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"][2]["props"]["children"][2]["props"]["children"][1]["props"]["defaultChecked"]=true
      }
      if(this.urlParams.get("at")!=null){
        bcopy["props"]["children"][2]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"][2]["props"]["children"][4]["props"]["children"][1]["props"]["defaultChecked"]=true
      }
      if(this.urlParams.get("to")!=null){
        bcopy["props"]["children"][2]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"][2]["props"]["children"][6]["props"]["children"][1]["props"]["defaultChecked"]=true
      }

      if(this.urlParams.get("isml")!=null){
        bcopy["props"]["children"][2]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"][3]["props"]["children"][2]["props"]["children"][1]["props"]["defaultChecked"]=true
      }

      //shell techs

      if(this.urlParams.get("bls")!=null){
        bcopy["props"]["children"][2]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"]["props"]["children"]["props"]["children"]["props"]["children"][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][1]["props"]["defaultChecked"]=true
      }
      if(this.urlParams.get("ils")!=null){
        bcopy["props"]["children"][2]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"]["props"]["children"]["props"]["children"]["props"]["children"][1]["props"]["children"][0]["props"]["children"][4]["props"]["children"][1]["props"]["defaultChecked"]=true
      }

      if(this.urlParams.get("als")!=null){
        bcopy["props"]["children"][2]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"]["props"]["children"]["props"]["children"]["props"]["children"][1]["props"]["children"][1]["props"]["children"][2]["props"]["children"][1]["props"]["defaultChecked"]=true
      }
      if(this.urlParams.get("ahs")!=null){
        bcopy["props"]["children"][2]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"]["props"]["children"]["props"]["children"]["props"]["children"][1]["props"]["children"][1]["props"]["children"][4]["props"]["children"][1]["props"]["defaultChecked"]=true
      }

      if(this.urlParams.get("bhs")!=null){
        bcopy["props"]["children"][2]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"]["props"]["children"]["props"]["children"]["props"]["children"][1]["props"]["children"][2]["props"]["children"][2]["props"]["children"][1]["props"]["defaultChecked"]=true
      }
      if(this.urlParams.get("ihs")!=null){
        bcopy["props"]["children"][2]["props"]["children"]["props"]["children"]["props"]["children"][0]["props"]["children"]["props"]["children"]["props"]["children"]["props"]["children"][1]["props"]["children"][2]["props"]["children"][4]["props"]["children"][1]["props"]["defaultChecked"]=true
      }

    }

    console.log("b is")
    console.log(bcopy)

    var newrea = {}
    for(var elt of Object.keys(emptydiv)){
      if(elt == "props"){
        newrea["props"] = {children : [acopy,scopy,bcopy]}
      } else{
        newrea[elt] = emptydiv[elt]
      }
    }
    //console.log(newrea);

    if(this.onceever == 0){
      this.intervalsetter()
      this.onceever = 1
    }

    return (newrea);
  }
}

render(<App />, document.getElementById('root'));
