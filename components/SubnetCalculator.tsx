
import React, { useState } from 'react';
import { Network, Server, Globe } from 'lucide-react';

export const SubnetCalculator: React.FC = () => {
  const [ip, setIp] = useState('192.168.1.1');
  const [cidr, setCidr] = useState(24);

  // Helper: IP to Long
  const ipToLong = (ip: string) => {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  };

  // Helper: Long to IP
  const longToIp = (long: number) => {
    return [
       (long >>> 24) & 255,
       (long >>> 16) & 255,
       (long >>> 8) & 255,
       long & 255
    ].join('.');
  };

  const calculate = () => {
     // Validate IP
     if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) return null;
     
     const mask = ~((1 << (32 - cidr)) - 1) >>> 0;
     const ipLong = ipToLong(ip);
     
     const netAddr = (ipLong & mask) >>> 0;
     const broadcast = (netAddr | (~mask >>> 0)) >>> 0;
     
     const firstHost = (netAddr + 1) >>> 0;
     const lastHost = (broadcast - 1) >>> 0;
     const numHosts = Math.pow(2, 32 - cidr) - 2;

     return {
        netmask: longToIp(mask),
        network: longToIp(netAddr),
        broadcast: longToIp(broadcast),
        firstHost: longToIp(firstHost),
        lastHost: longToIp(lastHost),
        count: numHosts > 0 ? numHosts : 0,
        binaryIp: ipLong.toString(2).padStart(32, '0').match(/.{8}/g)?.join('.')
     };
  };

  const res = calculate();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Subnet <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">IPv4 CIDR network analysis tool.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12">
         <div className="flex flex-col md:flex-row gap-6 mb-12 items-end">
             <div className="flex-1">
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">IP Address</label>
                 <input 
                   type="text" 
                   value={ip} 
                   onChange={e => setIp(e.target.value)} 
                   className="w-full p-4 bg-slate-50 border rounded-xl font-mono font-bold text-lg text-slate-800"
                   placeholder="192.168.0.1"
                 />
             </div>
             <div className="w-32">
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">CIDR</label>
                 <select 
                   value={cidr} 
                   onChange={e => setCidr(Number(e.target.value))}
                   className="w-full p-4 bg-slate-50 border rounded-xl font-mono font-bold text-lg text-slate-800"
                 >
                    {Array.from({length: 32}, (_, i) => i + 1).map(n => (
                       <option key={n} value={n}>/{n}</option>
                    ))}
                 </select>
             </div>
         </div>

         {res ? (
             <div className="space-y-8">
                 <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm md:text-base text-slate-300 overflow-x-auto">
                     <div className="mb-2 text-xs uppercase text-slate-500 font-bold tracking-widest">Binary Representation</div>
                     <div className="tracking-widest">{res.binaryIp}</div>
                     <div className="text-brand-500 mt-1">
                        {'1'.repeat(cidr)}{'0'.repeat(32-cidr)} (Mask)
                     </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-slate-100 rounded-xl p-5 shadow-sm">
                       <div className="flex items-center gap-2 text-brand-600 mb-2 font-bold uppercase text-xs">
                          <Network size={16}/> Network
                       </div>
                       <div className="font-mono text-xl font-bold text-slate-800">{res.network}</div>
                    </div>
                    <div className="border border-slate-100 rounded-xl p-5 shadow-sm">
                       <div className="flex items-center gap-2 text-brand-600 mb-2 font-bold uppercase text-xs">
                          <Globe size={16}/> Netmask
                       </div>
                       <div className="font-mono text-xl font-bold text-slate-800">{res.netmask}</div>
                    </div>
                     <div className="border border-slate-100 rounded-xl p-5 shadow-sm">
                       <div className="flex items-center gap-2 text-brand-600 mb-2 font-bold uppercase text-xs">
                          <Server size={16}/> Usable Hosts
                       </div>
                       <div className="font-mono text-xl font-bold text-slate-800">{res.count.toLocaleString()}</div>
                    </div>
                    <div className="border border-slate-100 rounded-xl p-5 shadow-sm">
                       <div className="flex items-center gap-2 text-brand-600 mb-2 font-bold uppercase text-xs">
                          <Globe size={16}/> Broadcast
                       </div>
                       <div className="font-mono text-xl font-bold text-slate-800">{res.broadcast}</div>
                    </div>
                 </div>

                 <div className="bg-brand-50 rounded-xl p-6 border border-brand-100">
                    <div className="text-brand-800 text-xs font-bold uppercase mb-2">Usable Host Range</div>
                    <div className="font-mono text-lg md:text-xl font-bold text-brand-900">
                       {res.firstHost} <span className="text-brand-400 mx-2">➔</span> {res.lastHost}
                    </div>
                 </div>
             </div>
         ) : (
             <div className="text-center text-slate-400 p-12">
                Invalid IP Address
             </div>
         )}
      </div>
    </div>
  );
};
