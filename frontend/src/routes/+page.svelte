<script lang="ts">
    import {
        Action,
        action,
        faceHashes,
        transcript,
        TranscriptRole,
    } from "$lib/app";
    import { afterUpdate } from "svelte";

    let entries: HTMLDivElement | undefined;

    let changed = false;

    transcript.subscribe(() => {
        changed = true;
    });

    afterUpdate(() => {
        if (changed && entries) {
            changed = false;
            entries.scrollTop = entries.scrollHeight - entries.clientHeight;
        }
    });
</script>

<div class="layout">
    <div class="left">
        <img class="icon" src="/microwave.png" alt="" />
        <h1>Emotionally Needy Devices</h1>
        <p>Now your appliances can be as needy as your S/O</p>
        <div>
            {#if $action == Action.On}
                <div class="action action--on">On</div>
            {:else}
                <div class="action action--off">Off</div>
            {/if}
        </div>
        <div>
            {#if $faceHashes.length > 0}
                <p class="hash">{$faceHashes[0]}</p>
            {/if}
        </div>
    </div>
    <div class="entries" bind:this={entries}>
        {#each $transcript as entry}
            {#if entry.role === TranscriptRole.HUMAN}
                <p class="entry entry--human">{entry.text}</p>
            {:else}
                <p class="entry entry--ai">🤖 {entry.text}</p>
            {/if}
        {/each}
        <p />
    </div>
</div>

<style>
    .icon {
        max-width: 248px;
    }

    .hash {
        color: #999;
    }

    .action {
        padding: 0.5rem;
        display: inline-block;
        border-radius: 24px;
        color: #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        border: 1px solid #ececec;
    }

    .action--on {
        background-color: #5add65;
        border: 4px solid #8eec96;
    }

    .action--off {
        background-color: #333;
        border: 4px solid #666;
    }

    .left {
        display: flex;
        flex-flow: column;
        gap: 1rem;
        align-items: center;
    }

    .layout {
        display: flex;
        flex-flow: row;
        gap: 1rem;

        height: 100%;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }

    .entries {
        height: 100%;
        display: flex;
        flex-flow: column;
        gap: 1rem;
        flex: auto;
        max-width: 800px;
        max-height: 700px;
        overflow: auto;
        overflow-x: hidden;
        padding: 1.5rem;
        border: 1px solid #ececec;
        border-radius: 12px;
    }

    .entries::-webkit-scrollbar {
        width: 12px;
    }

    .entries::-webkit-scrollbar-thumb {
        background-color: #e3e3e3;
        border-radius: 12px;
    }

    @keyframes in-left {
        0% {
            transform: translateX(-100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes in-right {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .entry {
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        padding: 0.75rem;
        font-size: 1.25rem;
        border-radius: 12px;
        max-width: 70%;
    }

    .entry--human {
        align-self: flex-end;
        background-color: rgb(73, 149, 235);
        color: white;
        animation: in-right 0.5s forwards;
    }

    .entry--ai {
        animation: in-left 0.5s forwards;
        align-self: flex-start;
    }
</style>
