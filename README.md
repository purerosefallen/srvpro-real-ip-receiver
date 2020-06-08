# srvpro-real-ip-receiver
An SRVPro plugin receiving real IP [proxy](https://github.com/purerosefallen/srvpro-reverse-proxy). 

## How to use

* Install this plugin to `plugins` directory of SRVPro.

* `npm ci`

* Make a copy of `config.example.json` to `config.json`, and input your reverse proxies' addresses. You may also input a CIDR subnet eg. `10.0.0.0/24` for cluster of proxies.
