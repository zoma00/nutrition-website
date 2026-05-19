use HTML::Entities;
use strict;
use warnings;
use utf8;

binmode(STDOUT, ":utf8");

my $keywords = qr/تغذية|دايت|رجيم|حمية|سعرات|سمنة|نحافة|وزن|انقاص|إنقاص|سكري|دهون|مقاومة|انسولين|صيام متقطع|غذائي|علاجي/;
my @files = ("facebook_raw.html", "facebook_mbasic_raw.html");
my %unique_lines;
my @snippets;

foreach my $file (@files) {
    if (open(my $fh, "<:encoding(UTF-8)", $file)) {
        my $content = do { local $/; <$fh> };
        my $decoded = decode_entities($content);
        
        # Specifically look for Title and Meta tags if they contain keywords
        if ($decoded =~ /<title>(.*?)<\/title>/is) {
            my $title = $1; $title =~ s/<[^>]+>//g;
            if ($title =~ /$keywords/) { $unique_lines{$title}++; }
        }

        # General text extraction
        my $clean_text = $decoded;
        $clean_text =~ s/<script.*?<\/script>//gs;
        $clean_text =~ s/<style.*?<\/style>//gs;
        $clean_text =~ s/<[^>]+>/ /g;
        $clean_text =~ s/\s+/ /g;
        
        my @lines = split(/[.،؛?\n]/, $clean_text);
        foreach my $line (@lines) {
            $line =~ s/^\s+|\s+$//g;
            if ($line =~ /$keywords/) {
                if (length($line) > 10 && length($line) < 500) {
                    $unique_lines{$line}++;
                    push @snippets, $line if @snippets < 20;
                }
            }
        }
        close($fh);
    }
}

my @topics = sort keys %unique_lines;

open(my $out, ">:utf8", "diet_topics_extracted_ar.txt");
print $out "Source: Facebook Content Extraction\n\n";

print $out "Extracted Topics:\n";
foreach my $t (@topics) {
    print $out "- $t\n";
}

# If no topics found or very few, add inferred ones as per instruction
if (scalar(@topics) < 3) {
    print $out "- التغذية العلاجية (Inferred)\n";
    print $out "- التوعية الصحية للأكل (Inferred)\n";
}

print $out "\nEvidence Snippets:\n";
if (@snippets) {
    foreach my $s (@snippets) {
        print $out "- $s\n";
    }
} else {
    print $out "(No snippets found in protected content)\n";
}
close($out);
