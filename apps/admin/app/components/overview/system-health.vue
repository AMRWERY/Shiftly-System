<template>
    <div>
        <!-- Main Card Container -->
        <div class="card-bg p-6 relative overflow-hidden w-full max-w-sm">
            <!-- Decorative Gear Icon (Top Right Background) -->
            <div class="absolute -top-4 -end-4 opacity-[0.05] pointer-events-none">
                <img src="/svg/settings-gear.svg" class="w-[120px] h-[120px]" alt="" />
            </div>

            <!-- Card Header -->
            <div class="flex items-center gap-4 mb-8">
                <div
                    class="w-10 h-10 bg-brand-primary/20 rounded-lg flex items-center justify-center border border-brand-primary/30 shadow-lg shadow-blue-500/10">
                    <img src="/svg/shield-health.svg" class="w-5 h-5" alt="health" />
                </div>
                <h2 class="text-white text-lg font-bold tracking-tight">System Health</h2>
            </div>

            <!-- Content Sections -->
            <div class="space-y-6">

                <!-- Database Status Row -->
                <div class="flex justify-between items-end">
                    <div class="space-y-1">
                        <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Database Status</p>
                        <p class="text-white font-bold text-lg leading-tight">{{ databaseStatus }}</p>
                    </div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-[10px] font-black text-brand-accent tracking-tighter">OPERATIONAL</span>
                        <div class="w-2.5 h-2.5 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                        </div>
                    </div>
                </div>

                <!-- Subtle Divider Line -->
                <div class="h-[1px] bg-gray-800/50 w-full"></div>

                <!-- Active Sessions Row -->
                <div class="flex justify-between items-end">
                    <div class="space-y-1">
                        <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Sessions</p>
                        <p class="text-white font-bold text-lg leading-tight">{{ sessions }} Concurrent Users</p>
                    </div>
                    <div class="bg-white/5 px-3 py-1 rounded-lg mb-1 border border-white/5 backdrop-blur-sm">
                        <span class="text-[11px] font-bold text-gray-400">{{ sessionLabel }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// You can pass these as props if you want this to be dynamic
const props = defineProps({
    databaseStatus: { type: String, default: 'PostgreSQL Clusters' },
    status: { type: String, default: 'OPERATIONAL' },
    sessions: { type: Number, default: 42 },
    sessionLabel: { type: String, default: 'Stable' }
})
</script>