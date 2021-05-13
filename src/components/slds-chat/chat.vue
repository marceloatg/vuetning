<template>
    <section role="log" class="slds-chat">
        <ul class="slds-chat-list">
            <li class="slds-chat-listitem slds-chat-listitem_bookend">
                <div class="slds-chat-bookend">
                    <span class="slds-icon_container slds-icon-utility-chat slds-chat-icon">
                        <svg class="slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chat"/>
                        </svg>
                    </span>
                    <p>Chat started by
                        <b>Andy Martinez</b> • 4:58 PM</p>
                </div>
            </li>
            <li class="slds-chat-listitem slds-chat-listitem_inbound">
                <div class="slds-chat-message">
                    <span aria-hidden="true" class="slds-avatar slds-avatar_circle slds-chat-avatar">
                        <abbr class="slds-avatar__initials slds-avatar__initials_inverse" title="Andy Martinez">AM</abbr>
                    </span>
                    <div class="slds-chat-message__body">
                        <div class="slds-chat-message__text slds-chat-message__text_inbound">
                            <span>Hi, my CloudWidget only speaks French</span>
                        </div>
                        <div class="slds-chat-message__meta" aria-label="said Andy Martinez at 4:59 PM">
                            Andy Martinez • 4:59 PM
                        </div>
                    </div>
                </div>
            </li>
            <li class="slds-chat-listitem slds-chat-listitem_outbound">
                <div class="slds-chat-message">
                    <div class="slds-chat-message__body">
                        <div class="slds-chat-message__text slds-chat-message__text_outbound-agent">
                            <span>Hi Andy, thank you for contacting Widget Support. Can you please tell me what language you are trying to program on your CloudWidget?</span>
                        </div>
                    </div>
                </div>
            </li>
            <li class="slds-chat-listitem slds-chat-listitem_outbound">
                <div class="slds-chat-message">
                    <div class="slds-chat-message__body">
                        <div class="slds-chat-message__text slds-chat-message__text_outbound-agent">
                            <span>Have you tried turning it off and on again?</span>
                        </div>
                        <div class="slds-chat-message__meta" aria-label="said Jason Dewar at 5:02 PM">
                            Jason Dewar • 5:02 PM
                        </div>
                    </div>
                </div>
            </li>
            <li class="slds-chat-listitem slds-chat-listitem_inbound">
                <div class="slds-chat-message">
                    <span aria-hidden="true" class="slds-avatar slds-avatar_circle slds-chat-avatar">
                        <abbr class="slds-avatar__initials slds-avatar__initials_inverse" title="Andy Martinez">AM</abbr>
                    </span>
                    <div class="slds-chat-message__body">
                        <div class="slds-chat-message__text slds-chat-message__text_inbound">
                            <span>yes, of course</span>
                        </div>
                        <div class="slds-chat-message__meta" aria-label="said Andy Martinez at 5:09 PM">
                            Andy Martinez • 5:09 PM
                        </div>
                    </div>
                </div>
            </li>
            <li class="slds-chat-listitem slds-chat-listitem_outbound">
                <div class="slds-chat-message">
                    <div class="slds-chat-message__body">
                        <div class="slds-chat-message__text slds-chat-message__text_outbound-agent">
                            <span>Sorry to hear that. Let me transfer you to a more technical support member. Thank you for your patience!</span>
                        </div>
                        <div class="slds-chat-message__meta" aria-label="said Jason Dewar at 5:15 PM">
                            Jason Dewar • 5:15 PM
                        </div>
                    </div>
                </div>
            </li>
            <li class="slds-chat-listitem slds-chat-listitem_event">
                <div class="slds-chat-event">
                    <div class="slds-chat-event__body">
                        <span class="slds-icon_container slds-icon-utility-change_owner slds-chat-icon">
                            <svg class="slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#change_owner"/>
                            </svg>
                        </span>
                        <p>
                            <b>Jason Dewar</b> sent a transfer request to
                            <b>Technical Support Team</b> • 5:19 PM</p>
                    </div>
                    <div class="slds-chat-event__agent-message">
                        Andy needs help changing the language on his CloudWidget
                    </div>
                </div>
            </li>
            <li class="slds-chat-listitem slds-chat-listitem_event">
                <div class="slds-chat-event">
                    <div class="slds-chat-event__body">
                        <span class="slds-icon_container slds-icon-utility-change_owner slds-chat-icon">
                            <svg class="slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#change_owner"/>
                            </svg>
                        </span>
                        <p>
                            <b>Technical Support Team</b> accepted the transfer request • 5:20 PM</p>
                    </div>
                </div>
            </li>
            <li class="slds-chat-listitem slds-chat-listitem_event">
                <div class="slds-chat-event">
                    <div class="slds-chat-event__body">
                        <span class="slds-icon_container slds-icon-utility-change_owner slds-chat-icon">
                            <svg class="slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#change_owner"/>
                            </svg>
                        </span>
                        <p>
                            <b>Amber Cann</b> accepted this chat • 5:22 PM</p>
                    </div>
                </div>
            </li>
            <li class="slds-chat-listitem slds-chat-listitem_outbound">
                <div class="slds-chat-message">
                    <div class="slds-chat-message__body">
                        <div class="slds-chat-message__text slds-chat-message__text_outbound">
                            <span>Hi Andy, my name is Amber and I can help you solve your issue.</span>
                        </div>
                        <div class="slds-chat-message__meta" aria-label="said Amber Cann at 5:23 PM">
                            Amber Cann • 5:23 PM
                        </div>
                    </div>
                </div>
            </li>
            <li class="slds-chat-listitem slds-chat-listitem_inbound">
                <div class="slds-chat-message">
                    <span aria-hidden="true" class="slds-avatar slds-avatar_circle slds-chat-avatar">
                        <abbr class="slds-avatar__initials slds-avatar__initials_inverse" title="Andy Martinez">AM</abbr>
                    </span>
                    <div class="slds-chat-message__body">
                        <div class="slds-chat-message__text slds-chat-message__text_inbound">
                            <span>Nevermind, I speak french.</span>
                        </div>
                        <div class="slds-chat-message__meta" aria-label="said Andy Martinez at 5:29 PM">
                            Andy Martinez • 5:29 PM
                        </div>
                    </div>
                </div>
            </li>
            <li class="slds-chat-listitem slds-chat-listitem_bookend">
                <div class="slds-chat-bookend slds-chat-bookend_stop">
                    <span class="slds-icon_container slds-icon-utility-end_chat slds-chat-icon">
                        <svg class="slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#end_chat"/>
                        </svg>
                    </span>
                    <p>Chat ended by
                        <b>Andy Martinez</b> • 5:30 PM</p>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: "SldsChat"
}
</script>

<style scoped>

</style>
