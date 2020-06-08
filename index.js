"use strict";
const _ = require("underscore");
const fs = require("fs");
const config = require("./config.json");
const IP = require("ip");

ygopro.constants.CTOS[49] = "X_FORWARDED_FOR";

const trustedSubnets = config.setRealIPFrom.map((subnet) => {
	if (subnet.includes("/")) {
		return IP.cidrSubnet(subnet);
	} else {
		return IP.subnet(subnet, ip.fromPrefixLen(32));
	}	
});

function isTrustedAddress(_ip) {
	let ip = _ip;
	if (IP.isV6Format(ip)) {
		ip = _ip.slice(7);
	}
	return _.any(trustedSubnets, (subnet) => {
		return subnet.contains(ip);
	});
}

ygopro.ctos_follow_after("X_FORWARDED_FOR", true, async (buffer, info, client, server, datas) => {
	const oldIP = client.ip;
	if (isTrustedAddress(oldIP)) {
		const newIP = `::ffff:${IP.toString(buffer)}`; // should be changed when IPv6 is coming. But YGOPro does not support v6.
		client.ip = newIP;
		client.is_local = client.ip && (client.ip.includes('127.0.0.1') || client.ip.includes(real_windbot_server_ip));
		let connect_count = ROOM_connected_ip[newIP] || 0;
		if (!settings.modules.test_mode.no_connect_count_limit && !client.is_local) {
			connect_count++
		}
		ROOM_connected_ip[oldIP] = 0;
		ROOM_connected_ip[newIP] = connect_count;
	}
	return true;
});
